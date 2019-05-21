import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { isLoadingWorkplaces } from '../../redux/workplace';
import { getProcessesIds } from '../../redux/process';
import { boundClearCurrentSelection } from '../../redux/ui';
import { calculateCurrentLayoutCostComplete, startCraftSingleIteration, cancelCraftSingleIteration } from "../../redux/craft";
import { fetchAllOperations, getOperationsByProcess } from '../../redux/operation';
import { isIterationRunning } from '../../redux/craft';
import Craft from '../../modules/utils/Craft';
import CraftNotification from '../panel/CraftNotification';
import { workplaceRepository } from '../../modules/workplace/workplaceRepository';
import { store } from '../../redux/configureStore';
import { swapWorkplacesPosition, swapWorkplacesPositionObservable } from './SwapTool';
import minBy from 'lodash/minBy';
import { tap, finalize, delay, map, mergeMap, concatMap, takeUntil } from 'rxjs/operators';
import { of, concat, merge, from, Observable, timer } from 'rxjs';

const CraftTool = ({ disabled, processesIds, runCraftIteration, calculateLayoutCost, cancelCraftIteration }) => {
    return (
        <>
            <Button onClick={() => runCraftIteration(processesIds)} icon='calculator' disabled={disabled}>
                Craft iteration
            </Button>
            <Button onClick={() => calculateLayoutCost(processesIds)} icon='calculator' disabled={disabled}
                title='Calculate cost of current layout using Craft algorithm'>
                Layout cost
            </Button>
            {/* <Button onClick={cancelCraftIteration} icon='calculator'>
                Cancel
            </Button> */}
            <CraftNotification />
        </>
    )
}

const mapStateToProps = state => ({
    disabled: isLoadingWorkplaces(state) || isIterationRunning(state),
    processesIds: getProcessesIds(state),
})

const mapDispatchToProps = dispatch => {
    const fetchOperationsAndRunCallback = (processesIds, callback) =>
        dispatch(fetchAllOperations({ processesIds, callback }))

    return {
        runCraftIteration(processesIds) {
            boundClearCurrentSelection(dispatch)
            fetchOperationsAndRunCallback(processesIds, () => runCraftIteration(dispatch))
        },
        calculateLayoutCost(processesIds) {
            fetchOperationsAndRunCallback(processesIds, () => calculateLayoutCost(dispatch))
        },
        cancelCraftIteration() {
            dispatch(cancelCraftSingleIteration())
        },
    }
}

const calculateLayoutCost = dispatch => {
    const workplaces = workplaceRepository.list();
    const operationsByProcess = getOperationsByProcess(store.getState());

    const craft = new Craft({ workplaces, operationsByProcess })

    craft.calculateLayoutCostPromise().then(cost => {
        console.log('layout cost = ' + cost)
        dispatch(calculateCurrentLayoutCostComplete({ cost }))
    })
}

const runCraftIteration = dispatch => {
    const workplaces = workplaceRepository.list();
    const operationsByProcess = getOperationsByProcess(store.getState());

    const craftIterations = createCraftIterations(workplaces, operationsByProcess);
    //console.log('craftIterations', craftIterations);

    dispatch(startCraftSingleIteration({ craftIterations }))

    //iterateAsPromises(craftIterations, dispatch);
    //iterateAsObservables(craftIterations)
}

const createCraftIterations = (workplaces, operationsByProcess) => {
    const craft = new Craft({ workplaces, operationsByProcess });
    let swaps = craft.calculatePossibleSwaps();
    const calculateLayoutCost = craft.calculateLayoutCostObservable;
    const initialLayout = { calculateLayoutCost, exchange: {} };

    const craftIterations = swaps.map(pair => {
        const workplacesPair = pair.map(id => workplaceRepository.findById(id));
        return {
            calculateLayoutCost,
            exchange: {
                ids: pair,
                titles: workplacesPair.map(o => o.title),
                workplaces: workplacesPair
            }
        }
    });

    return [initialLayout, ...craftIterations]
}

const iterateAsObservables = craftIterations => {
    const observable = concat(
        ...craftIterations.flatMap(o => [
            swapWorkplacesPositionObservable(o.exchange.workplaces),
            o.calculateLayoutCost().pipe(
                map(cost => { o.cost = cost; return o; }),
                delay(100)
            ),
            swapWorkplacesPositionObservable(o.exchange.workplaces)
        ])
    )//.pipe(takeUntil(timer(3000)));

    const subscription = observable.subscribe({
        next(value) {
            console.log(value)
        },
        complete() {
            const minimalCostIteration = minBy(craftIterations, 'cost');
            console.log('done minimalCostIteration', minimalCostIteration)
        }
    });

    console.log('subscription', subscription)

    // setTimeout(() => {
    //     console.log('unsubscribe')
    //     subscription.unsubscribe();
    // }, 3000);
}

const iterateAsPromises = (craftIterations, dispatch) => {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    craftIterations.map(o => o.calculateLayoutCost).reduce(
        (p, calculateLayoutCost, idx) => p.then(() => {
            const { exchange } = craftIterations[idx];

            const workplaces = exchange.workplaces;
            workplaces && swapWorkplacesPosition(...workplaces);

            return wait(0)
                .then(calculateLayoutCost)
                .then(cost => {
                    craftIterations[idx].cost = cost;
                    workplaces && swapWorkplacesPosition(...workplaces);
                    console.log(idx, cost, craftIterations[idx]);
                })
        }), craftIterations[0].calculateLayoutCost()
    ).then(() => {
        const minimalCostIteration = minBy(craftIterations, 'cost');
        console.log('done minimalCostIteration', minimalCostIteration)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CraftTool)