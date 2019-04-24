import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, switchMap, catchError, map, withLatestFrom, finalize } from 'rxjs/operators';
import { of, merge } from 'rxjs';
import * as api from '../modules/api/api';
import {
    fetchHallWithWorkplacesSuccess, fetchHallWithWorkplacesFailure, addWorkplace, sendHallWithWorkplacesSuccess,
    sendHallWithWorkplacesFailure
} from './workplace';
import { addProcess } from './process';
import { updateProductionHall } from './productionHall';
import { fetchOperationsSuccess, fetchOperationsFailure, removeAllOperations, addOperation, getOperationsByProcess } from './operation';
import { setSelectedItemsActiveTab } from './ui';
import {
    PRODUCTION_HALL_WITH_WORKPLACES_FETCH, PRODUCTION_HALL_WITH_WORKPLACES_SEND, WORKPLACE_SELECT
} from './workplace';
import { OPERATIONS_FETCH, OPERATIONS_FETCH_ALL } from './operation';

// const fetchWorkplaceEpic = action$ => action$.pipe(
//     ofType('FETCH_WORKPLACE'),
//     switchMap(action => api.fetchWorkplace(action.id).pipe(
//         mergeMap(workplace => of(actions.fetchWorkplaceSuccess(workplace), actions.addWorkplace(workplace))),
//         catchError(error => of(actions.fetchWorkplaceFailure(error)))
//     ))
// );

// const fetchWorkplacesEpic = action$ => action$.pipe(
//     ofType('FETCH_WORKPLACES'),
//     switchMap(() => api.fetchWorkplaces().pipe(
//         mergeMap(workplaces => of(actions.fetchWorkplaceSuccess(workplaces), ...workplaces.map(o => actions.addWorkplace(o)))),
//         catchError(error => of(actions.fetchWorkplaceFailure(error)))
//     ))
// );

// const updateWorkplaceEpic = action$ => action$.pipe(
//     ofType('PATCH_WORKPLACE'),
//     switchMap(action => api.updateWorkplace(action.id, action.payload).pipe(
//         map(response => actions.fetchWorkplaceSuccess(response)),
//         catchError(error => of(actions.fetchWorkplaceFailure(error)))
//     ))
// );

const fetchProductionHallWithWorkplacesFromApiEpic = action$ => action$.pipe(
    ofType(PRODUCTION_HALL_WITH_WORKPLACES_FETCH),
    switchMap(() => api.fetchProductionHallWithWorkplaces().pipe(
        mergeMap(({ productionHall, workplaces, processes }) => of(
            fetchHallWithWorkplacesSuccess(workplaces),
            ...workplaces.map(o => addWorkplace(o)),
            ...processes.map(o => addProcess(o)),
            updateProductionHall(productionHall)
        )),
        catchError(error => of(fetchHallWithWorkplacesFailure(error)))
    ))
);

const sendProductionHallWithWorkplacesToApiEpic = (action$, state$) => action$.pipe(
    ofType(PRODUCTION_HALL_WITH_WORKPLACES_SEND),
    withLatestFrom(state$),
    switchMap(([, state]) => api.postProductionHallWithWorkplaces(state).pipe(
        map(response => sendHallWithWorkplacesSuccess(response)),
        catchError(error => of(sendHallWithWorkplacesFailure(error)))
    ))
);

const fetchProcessOperationsFromApiEpic = (action$, state$) => action$.pipe(
    ofType(OPERATIONS_FETCH),
    switchMap(({ payload }) => fetchOperationsIfNeeded(payload.processId, state$.value, payload.selectActions))
)

const fetchMultipleProcessOperationsFromApiEpic = (action$, state$) => action$.pipe(
    ofType(OPERATIONS_FETCH_ALL),
    mergeMap(({ payload }) => {
        const observables = [...payload.processesIds.map(id => fetchOperationsIfNeeded(id, state$.value))];
        return merge(...observables)
            .pipe(finalize(payload.callback))
    })
)

const fetchOperationsIfNeeded = (processId, state, selectActions = () => []) => {
    const fetchedOperations = getOperationsByProcess(state, processId);

    return fetchedOperations !== undefined ?
        of(fetchOperationsSuccess({ processId, fetchedOperations }), ...selectActions(processId, fetchedOperations))
        :
        api.fetchOperationsByProcess(processId).pipe(
            mergeMap(operations => of(
                fetchOperationsSuccess({ processId, fetchedOperations: operations }),
                removeAllOperations(processId),
                ...operations.map(o => addOperation(processId, o)),
                ...selectActions(processId, operations)
            )),
            catchError(error => of(fetchOperationsFailure({ processId, error })))
        )
}

const selectWorkplaceEpic = action$ => action$.pipe(
    ofType(WORKPLACE_SELECT),
    map(({ payload }) => {
        const activeTab = payload.activeTab ? payload.activeTab : payload.ids.length === 0 ? 'operations' : 'workplaces';
        return setSelectedItemsActiveTab(activeTab)
    })
)

export default combineEpics(
    //fetchWorkplaceEpic,
    //fetchWorkplacesEpic,
    //updateWorkplaceEpic,
    fetchProductionHallWithWorkplacesFromApiEpic,
    sendProductionHallWithWorkplacesToApiEpic,
    fetchProcessOperationsFromApiEpic,
    selectWorkplaceEpic,
    fetchMultipleProcessOperationsFromApiEpic
)