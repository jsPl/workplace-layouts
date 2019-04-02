import { ofType, combineEpics } from 'redux-observable';
import { flatMap, switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as api from '../api';
import {
    fetchHallWithWorkplacesSuccess, fetchHallWithWorkplacesFailure, addWorkplace, sendHallWithWorkplacesSuccess,
    sendHallWithWorkplacesFailure
} from './workplace';
import { addProcess, selectProcess } from './process';
import { updateProductionHall } from './productionHall';
import { fetchOperationsSuccess, fetchOperationsFailure, removeAllOperations, addOperation } from './operation';
import { setSelectedItemsActiveTab } from './ui';
import {
    selectWorkplace,
    PRODUCTION_HALL_WITH_WORKPLACES_FETCH, PRODUCTION_HALL_WITH_WORKPLACES_SEND, WORKPLACE_SELECT
} from './workplace';
import { OPERATIONS_FETCH } from './operation';

// const fetchWorkplaceEpic = action$ => action$.pipe(
//     ofType('FETCH_WORKPLACE'),
//     switchMap(action => api.fetchWorkplace(action.id).pipe(
//         flatMap(workplace => of(actions.fetchWorkplaceSuccess(workplace), actions.addWorkplace(workplace))),
//         catchError(error => of(actions.fetchWorkplaceFailure(error)))
//     ))
// );

// const fetchWorkplacesEpic = action$ => action$.pipe(
//     ofType('FETCH_WORKPLACES'),
//     switchMap(() => api.fetchWorkplaces().pipe(
//         flatMap(workplaces => of(actions.fetchWorkplaceSuccess(workplaces), ...workplaces.map(o => actions.addWorkplace(o)))),
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
        flatMap(({ productionHall, workplaces, processes }) => of(
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

const fetchProcessOperationsFromApiEpic = action$ => action$.pipe(
    ofType(OPERATIONS_FETCH),
    switchMap(({ payload }) => fetchOperationsIfNeeded(payload))
)

const fetchOperationsIfNeeded = ({ processId, fetchedOperations }) => {
    const selectActions = operations => [
        selectWorkplace({ ids: operations.map(o => o.default_workplace_id), activeTab: 'operations' }),
        selectProcess({ ids: [processId] })
    ];

    return fetchedOperations !== undefined ?
        [fetchOperationsSuccess(fetchedOperations), ...selectActions(fetchedOperations)]
        :
        api.fetchOperationsByProcess(processId).pipe(
            flatMap(operations => of(
                fetchOperationsSuccess(operations),
                removeAllOperations(processId),
                ...operations.map(o => addOperation(processId, o)),
                ...selectActions(operations)
            )),
            catchError(error => of(fetchOperationsFailure(error)))
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
    selectWorkplaceEpic
)