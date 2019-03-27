import { ofType, combineEpics } from "redux-observable";
import { flatMap, switchMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { of } from 'rxjs';
import * as api from './api';
import * as actions from './actions';
import {
    PRODUCTION_HALL_WITH_WORKPLACES_FETCH, PRODUCTION_HALL_WITH_WORKPLACES_SEND,
    OPERATIONS_FETCH, WORKPLACE_SELECT
} from './actionTypes';

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
            actions.fetchWorkplaceSuccess(workplaces),
            ...workplaces.map(o => actions.addWorkplace(o)),
            ...processes.map(o => actions.addProcess(o)),
            actions.updateProductionHall(productionHall)
        )),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

const sendProductionHallWithWorkplacesToApiEpic = (action$, state$) => action$.pipe(
    ofType(PRODUCTION_HALL_WITH_WORKPLACES_SEND),
    withLatestFrom(state$),
    switchMap(([, state]) => api.postProductionHallWithWorkplaces(state).pipe(
        map(response => actions.sendHallWithWorkplacesSuccess(response)),
        catchError(error => of(actions.sendHallWithWorkplacesFailure(error)))
    ))
);

const fetchProcessOperationsFromApiEpic = action$ => action$.pipe(
    ofType(OPERATIONS_FETCH),
    switchMap(({ process_id }) => api.fetchProcessOperations(process_id).pipe(
        flatMap(operations => of(
            actions.fetchOperationsSuccess(operations),
            actions.removeAllOperations(),
            ...operations.map(o => actions.addOperation(o)),
            actions.setSelectedItemsActiveTab('operations')
        )),
        catchError(error => of(actions.fetchOperationsFailure(error)))
    ))
)

const selectWorkplaceEpic = action$ => action$.pipe(
    ofType(WORKPLACE_SELECT),
    map(({ ids }) => {
        const activeTab = ids.length === 0 ? 'operations' : 'workplaces';
        return actions.setSelectedItemsActiveTab(activeTab)
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