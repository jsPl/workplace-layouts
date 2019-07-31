import { ofType, combineEpics } from 'redux-observable';
import {
    mergeMap, switchMap, concatMap, catchError, map, flatMap, withLatestFrom, finalize, delay, takeUntil
} from 'rxjs/operators';
import { Observable, of, merge, concat } from 'rxjs';
import * as api from '../modules/api/api';
import {
    fetchHallWithWorkplacesSuccess, fetchHallWithWorkplacesFailure, addWorkplace, sendHallWithWorkplacesSuccess,
    sendHallWithWorkplacesFailure, getWorkplaces, updateWorkplace
} from './workplace';
import { addProcess, selectProcess, getSelectedProcessesId, unselectAllProcesses } from './process';
import { updateProductionHall } from './productionHall';
import { fetchOperationsSuccess, fetchOperationsFailure, removeAllOperations, addOperation, getOperationsByProcess } from './operation';
import { setSelectedItemsActiveTab } from './ui';
import {
    CRAFT_SINGLE_ITERATION_START, CRAFT_SINGLE_ITERATION_CANCEL, completeCraftSingleIteration, nextCraftSingleIteration,
    addCraftSummaryIteration, getCurrentIterationItems, getSummaryIterations, CRAFT_SUMMARY_APPLY_LAYOUT
} from './craft';
import {
    PRODUCTION_HALL_WITH_WORKPLACES_FETCH, PRODUCTION_HALL_WITH_WORKPLACES_SEND, WORKPLACE_SELECT, selectWorkplace
} from './workplace';
import { OPERATIONS_FETCH, OPERATIONS_FETCH_ALL } from './operation';
import { swapWorkplacesPositionObservable } from '../components/tools/SwapTool';
import minBy from 'lodash/minBy';
import { settings } from '../modules/utils/settings';

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
    mergeMap(({ payload }) => fetchOperationsIfNeeded(payload.processId, state$.value, payload.selectActions))
)

const fetchMultipleProcessOperationsFromApiEpic = (action$, state$) => action$.pipe(
    ofType(OPERATIONS_FETCH_ALL),
    mergeMap(({ payload }) => {
        const observables = [...payload.processesIds.map(id => fetchOperationsIfNeeded(id, state$.value))];
        return merge(...observables)
            .pipe(finalize(payload.callback))
    })
)

const runCraftSingleIteration = (action$, state$) => action$.pipe(
    ofType(CRAFT_SINGLE_ITERATION_START),
    concatMap(({ payload }) => {
        const { craftIterations } = payload;

        const iterate$ = concat(
            ...craftIterations.flatMap(o => [
                swapWorkplacesPositionObservable(o.exchange.workplaces),
                o.calculateLayoutCost().pipe(
                    withLatestFrom(state$),
                    map(([cost, state]) => {
                        o.cost = cost;
                        o.layout = getWorkplaces(state).map(({ id, x, y }) => ({ id, x, y }));
                        return nextCraftSingleIteration({ craftIteration: o })
                    }),
                    delay(settings.getCraftSpeedSettings().swapDelayMs)
                ),
                swapWorkplacesPositionObservable(o.exchange.workplaces)
            ]),
            of(completeCraftSingleIteration({ craftIterations })).pipe(
                withLatestFrom(state$),
                flatMap(([action, state]) => {
                    const items = getCurrentIterationItems(state);
                    const minByCostItem = minBy(items, 'cost');
                    const summary = getSummaryIterations(state);
                    const actions = [];

                    if (summary.length === 0) {
                        actions.push(addCraftSummaryIteration(items[0] || {}))
                    }

                    if (Object.keys(minByCostItem.exchange).length > 0) {
                        actions.push(addCraftSummaryIteration(minByCostItem))
                    }

                    return of(action, ...actions)
                })
            ),
        );

        const cancel$ = action$.pipe(ofType(CRAFT_SINGLE_ITERATION_CANCEL));

        //return merge(iterate$, cancel$).pipe(takeWhile(action => action.type !== CRAFT_SINGLE_ITERATION_CANCEL, true))
        return iterate$.pipe(takeUntil(cancel$))
    }),
    //tap(o => console.log('tap', o)),
)

// const fetchMultipleProcessOperationsFromApiEpic = action$ => action$.pipe(
//     ofType(OPERATIONS_FETCH_ALL),
//     switchMap(({ payload }) =>
//         merge(...payload.processesIds.map(processId =>
//             concat(
//                 of(fetchOperations({ processId })),
//                 // Note: This keeps the observable running until either
//                 // the corresponding "success" or "failure" action is dispatched:
//                 action$.pipe(
//                     ofType(OPERATIONS_FETCH_SUCCESS, OPERATIONS_FETCH_FAILURE),
//                     filter(action => action.payload.processId === processId),
//                     first(),
//                     ignoreElements(),
//                 ),
//             )
//         )).pipe(
//             finalize(payload.callback),
//         )
//     )
// )

const fetchOperationsIfNeeded = (processId, state, selectActions = () => []) => {
    const fetchedOperations = getOperationsByProcess(state, processId);

    return fetchedOperations !== undefined ?
        of(fetchOperationsSuccess({ processId, fetchedOperations }), ...selectActions(processId, fetchedOperations))
        :
        api.fetchOperationsByProcess(processId).pipe(
            mergeMap(operations => of(
                removeAllOperations(processId),
                ...operations.map(o => addOperation(processId, o)),
                fetchOperationsSuccess({ processId, fetchedOperations: operations }),
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

const moveAnimateWorkplaceObservable = (workplace, x, y) => new Observable(subscriber => {
    workplace.svg.animate(200, '>', 0).move(x, y)
        .afterAll(() => subscriber.complete())
})

const applyCraftLayoutEpic = (action$, state$) => action$.pipe(
    ofType(CRAFT_SUMMARY_APPLY_LAYOUT),
    withLatestFrom(state$),
    flatMap(([action, state]) => {
        const { layout } = action.payload;
        const selectedProcesses = getSelectedProcessesId(state);
        const unselectActions = [selectWorkplace({ ids: [] }), unselectAllProcesses()];
        const selectActions = (processId, operations) => [
            selectWorkplace({ ids: operations.map(o => o.default_workplace_id), activeTab: 'operations' }),
            selectProcess({ ids: [processId] })
        ];
        const moveLayout$ = merge(...layout.filter(o => {
            const { x, y, workplace } = o;
            const { x: oldX, y: oldY } = workplace.getUpperLeftPosition();
            return oldX !== x || oldY !== y;
        }).map(({ id, x, y, workplace }) =>
            concat(moveAnimateWorkplaceObservable(workplace, x, y), of(updateWorkplace({ id, x, y })))
        ))

        const result = concat(unselectActions, moveLayout$);

        if (selectedProcesses.length === 1) {
            return concat(result, fetchOperationsIfNeeded(...selectedProcesses, state, selectActions))
        }

        return concat(result);
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
    fetchMultipleProcessOperationsFromApiEpic,
    runCraftSingleIteration,
    applyCraftLayoutEpic,
)