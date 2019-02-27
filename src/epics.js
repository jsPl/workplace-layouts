import { ofType, combineEpics } from "redux-observable";
import { flatMap, switchMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { of } from 'rxjs';
import * as api from './api';
import * as actions from './actions';
//import { getWorkplaces, getProductionHall } from './selectors';

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

const fetchFromApiEpic = action$ => action$.pipe(
    ofType('FETCH_WORKPLACES'),
    switchMap(() => api.fetchFromApi().pipe(
        flatMap(({ productionHall, workplaces }) => of(
            actions.fetchWorkplaceSuccess(workplaces),
            ...workplaces.map(o => actions.addWorkplace(o)),
            actions.updateProductionHall(productionHall)
        )),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

const postToApiEpic = (action$, state$) => action$.pipe(
    ofType('SAVE_ALL_DATA'),
    withLatestFrom(state$),
    switchMap(([, state]) => api.postToApi(state).pipe(
        map(response => actions.saveAllDataSuccess(response)),
        catchError(error => of(actions.saveAllDataFailure(error)))
    ))
);

export default combineEpics(
    //fetchWorkplaceEpic,
    //fetchWorkplacesEpic,
    //updateWorkplaceEpic,
    fetchFromApiEpic,
    postToApiEpic
)