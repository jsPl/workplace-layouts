import { ofType, combineEpics } from "redux-observable";
import { flatMap, catchError, map } from "rxjs/operators";
import { of, throwError } from 'rxjs';
import * as api from './api';
import * as actions from './actions';

const throwErrorIfExistsInResponse = response => {
    return response.is_request_successful === false ?
        throwError({ message: response.error_message || 'Coś nie zadziałało...' }) : of(response)
}

const fetchWorkplaceEpic = action$ => action$.pipe(
    ofType('FETCH_WORKPLACE'),
    flatMap(action => api.fetchWorkplace(action.id).pipe(
        flatMap(response => of(actions.fetchWorkplaceSuccess(response), actions.addWorkplace(response))),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

const fetchWorkplacesEpic = action$ => action$.pipe(
    ofType('FETCH_WORKPLACES'),
    flatMap(() => api.fetchWorkplaces().pipe(
        flatMap(response => throwErrorIfExistsInResponse(response)),
        flatMap(response => of(actions.fetchWorkplaceSuccess(response), ...response.stanowiska.map(o => actions.addWorkplace(o)))),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

const updateWorkplaceEpic = action$ => action$.pipe(
    ofType('PATCH_WORKPLACE'),
    flatMap(action => api.updateWorkplace(action.id, action.payload).pipe(
        map(response => actions.fetchWorkplaceSuccess(response)),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

export default combineEpics(
    fetchWorkplaceEpic,
    fetchWorkplacesEpic,
    updateWorkplaceEpic
)