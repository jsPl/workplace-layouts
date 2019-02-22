import { ofType, combineEpics } from "redux-observable";
import { flatMap, switchMap, catchError, map } from "rxjs/operators";
import { of } from 'rxjs';
import * as api from './api';
import * as actions from './actions';

const fetchWorkplaceEpic = action$ => action$.pipe(
    ofType('FETCH_WORKPLACE'),
    switchMap(action => api.fetchWorkplace(action.id).pipe(
        flatMap(workplace => of(actions.fetchWorkplaceSuccess(workplace), actions.addWorkplace(workplace))),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

const fetchWorkplacesEpic = action$ => action$.pipe(
    ofType('FETCH_WORKPLACES'),
    switchMap(() => api.fetchWorkplaces().pipe(
        flatMap(workplaces => of(actions.fetchWorkplaceSuccess(workplaces), ...workplaces.map(o => actions.addWorkplace(o)))),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

const updateWorkplaceEpic = action$ => action$.pipe(
    ofType('PATCH_WORKPLACE'),
    switchMap(action => api.updateWorkplace(action.id, action.payload).pipe(
        map(response => actions.fetchWorkplaceSuccess(response)),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

export default combineEpics(
    fetchWorkplaceEpic,
    fetchWorkplacesEpic,
    updateWorkplaceEpic
)