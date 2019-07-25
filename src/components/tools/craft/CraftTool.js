import React from 'react';
import { Button, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { isLoadingWorkplaces } from '../../../redux/workplace';
import { getProcessesIds } from '../../../redux/process';
import { boundClearCurrentSelection } from '../../../redux/ui';
import {
    calculateCurrentLayoutCostComplete, startCraftSingleIteration, isIterationRunning, isIterationComplete,
    isIterationCanceled, clearCraftSummaryIteration, getSummaryIterations, changeCraftSummaryVisibility
} from '../../../redux/craft';
import { fetchAllOperations, getOperationsByProcess } from '../../../redux/operation';
import Craft from '../../../modules/utils/Craft';
import CraftNotification from './CraftNotification';
import { workplaceRepository } from '../../../modules/workplace/workplaceRepository';
import { store } from '../../../redux/configureStore';
import CraftSummaryIterationList from './CraftSummaryIterationList';
import CraftSummaryDrawer from './CraftSummaryDrawer';

const CraftTool = props => {
    const { disabled, processesIds, calculateLayoutCost } = props;
    return (
        <>
            <Button onClick={() => calculateLayoutCost(processesIds)} icon='calculator' disabled={disabled}
                title='Calculate cost of current layout using Craft algorithm'>
                Layout cost
            </Button>
            <OptimizeLayoutButton {...props} />
            
            <CraftNotification />
            
            <CraftSummaryDrawer>
                <CraftSummaryIterationList />
            </CraftSummaryDrawer>
        </>
    )
}

const CraftDropdownMenu = ({ children, setCraftSummaryVisible }) => {
    const handleMenuClick = ({ key }) => {
        if (key === 'summary') {
            setCraftSummaryVisible(true)
        }
    }

    const overlay =
        <Menu onClick={handleMenuClick}>
            <Menu.Item key='summary'>
                <Icon type='bars' />
                Craft summary
            </Menu.Item>
        </Menu>

    return (
        <Dropdown overlay={overlay}>{children}</Dropdown>
    )
}

const OptimizeLayoutButton = ({ disabled, processesIds, runCraftAlgorithm, craftSummaryAvailable, setCraftSummaryVisible }) => {
    const btn =
        <Button onClick={() => runCraftAlgorithm(processesIds)} icon='calculator' disabled={disabled}
            title='Try optimizing current layout using Craft algorithm'>
            Optimize layout {craftSummaryAvailable && <Icon type='down' />}
        </Button>

    if (craftSummaryAvailable) {
        return <CraftDropdownMenu setCraftSummaryVisible={setCraftSummaryVisible}>{btn}</CraftDropdownMenu>
    }
    return btn
}

const mapStateToProps = state => {
    return {
        disabled: isLoadingWorkplaces(state) || isIterationRunning(state),
        processesIds: getProcessesIds(state),
        craftSummaryAvailable: !isIterationComplete(state) && !isIterationCanceled(state) && !isIterationRunning(state)
            && getSummaryIterations(state).length > 0,
    }
}

const mapDispatchToProps = dispatch => {
    const fetchOperationsAndRunCallback = (processesIds, callback) =>
        dispatch(fetchAllOperations({ processesIds, callback }))

    return {
        runCraftAlgorithm(processesIds) {
            boundClearCurrentSelection(dispatch)
            fetchOperationsAndRunCallback(processesIds, () => runCraftIteration(dispatch))
        },
        calculateLayoutCost(processesIds) {
            fetchOperationsAndRunCallback(processesIds, () => calculateLayoutCost(dispatch))
        },
        setCraftSummaryVisible(visible) {
            dispatch(changeCraftSummaryVisibility({ visible }))
        }
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

    console.log('craftIterations',craftIterations)    

    dispatch(clearCraftSummaryIteration());
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

// const iterateAsPromises = (craftIterations, dispatch) => {
//     const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

//     craftIterations.map(o => o.calculateLayoutCost).reduce(
//         (p, calculateLayoutCost, idx) => p.then(() => {
//             const { exchange } = craftIterations[idx];

//             const workplaces = exchange.workplaces;
//             workplaces && swapWorkplacesPosition(...workplaces);

//             return wait(0)
//                 .then(calculateLayoutCost)
//                 .then(cost => {
//                     craftIterations[idx].cost = cost;
//                     workplaces && swapWorkplacesPosition(...workplaces);
//                     console.log(idx, cost, craftIterations[idx]);
//                 })
//         }), craftIterations[0].calculateLayoutCost()
//     ).then(() => {
//         const minimalCostIteration = minBy(craftIterations, 'cost');
//         console.log('done minimalCostIteration', minimalCostIteration)
//     })
// }

export default connect(mapStateToProps, mapDispatchToProps)(CraftTool)