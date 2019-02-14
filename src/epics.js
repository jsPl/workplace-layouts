import { ofType, combineEpics } from "redux-observable";
import { flatMap, catchError } from "rxjs/operators";
import { of } from 'rxjs';
import * as api from './api';
import * as actions from './actions';

const fetchWorkplaceEpic = action$ => action$.pipe(
    ofType('FETCH_WORKPLACE'),
    flatMap(action => api.fetchWorkplace(action.id).pipe(
        flatMap(response => of(actions.fetchWorkplaceSuccess(response), actions.addWorkplace(response))),
        catchError(error => of(actions.fetchWorkplaceFailure(error)))
    ))
);

export default combineEpics(fetchWorkplaceEpic)