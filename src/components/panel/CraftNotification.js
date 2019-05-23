import React, { useEffect, useRef } from 'react';
import { notification, Progress, Button } from 'antd';
import { connect } from 'react-redux';
import minBy from 'lodash/minBy';
import {
    isIterationRunning, isIterationComplete, isIterationCanceled, cancelCraftSingleIteration,
    getPercentCompletionOfRunningIteration, getCurrentIterationItems, startCraftSingleIteration
} from '../../redux/craft';
import { sendHallWithWorkplaces, isSaving as isSavingLayout } from '../../redux/workplace';
import { swapWorkplacesPosition } from '../tools/SwapTool';
import { CountdownTimer } from './CountdownTimer';

const key = 'craft-notification';

const CraftNotification = ({ running, complete, canceled, percentComplete, items,
    cancelCraftIteration, nextCraftIteration, saveCurrentLayout, isSavingLayout }) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            if (running || complete || canceled) {
                const minimalCostItem = complete && minBy(items, 'cost');
                const type = complete ? 'success' : (canceled ? 'error' : 'info');
                const stateText = running ? 'in progress...' : (complete ? 'complete' : (canceled ? 'canceled' : ''));

                const btn =
                    <NotificationButtons
                        canceled={canceled}
                        complete={complete}
                        minimalCostItem={minimalCostItem}
                        cancelCraftIteration={cancelCraftIteration}
                        nextCraftIteration={nextCraftIteration}
                        saveCurrentLayout={saveCurrentLayout}
                        craftIterations={items}
                        isSavingLayout={isSavingLayout}
                    />

                const description =
                    <Description
                        items={items}
                        percentComplete={percentComplete}
                        complete={complete}
                        minimalCostItem={minimalCostItem}
                    />

                notification[type]({
                    message: `Craft iteration: ${stateText}`,
                    description, key, btn,
                    duration: 0,
                });
            }
        }
    })

    return null
}

const NotificationButtons = ({ minimalCostItem, complete, canceled, cancelCraftIteration,
    nextCraftIteration, saveCurrentLayout, craftIterations, isSavingLayout }) => {
    const btns = [];

    if (minimalCostItem) {
        const { exchange } = minimalCostItem;
        if (exchange.ids) {
            const runNextIteration = () => nextCraftIteration(exchange, craftIterations)

            btns.push(
                <CountdownTimer key='1' seconds={5} onCountdownComplete={runNextIteration}>
                    <Button key='1' type='primary' size='small' onClick={runNextIteration}>
                        Exchange and run next iteration
                    </Button>
                </CountdownTimer>
            )
        }
        else {
            btns.push(<Button key='3' type='primary' size='small' loading={isSavingLayout}
                onClick={saveCurrentLayout}>Save current layout</Button>
            )
        }
    }

    if (!complete) {
        btns.push(<Button key='2' type='danger' size='small' disabled={canceled} onClick={cancelCraftIteration}>Cancel</Button>);
    }

    return btns
}

const Description = ({ items, percentComplete, complete, minimalCostItem }) => {
    const text =
        <span className='text'>
            <InitialCost items={items} />
            <MinimalCost minimalCostItem={minimalCostItem} />
            <BestExchange minimalCostItem={minimalCostItem} />
        </span>

    return (
        <div>
            {!complete && <Progress type='circle' percent={percentComplete} width={45} />}
            {text}
        </div>
    )
}

const InitialCost = ({ items }) => items.length > 0 && <div>{`Initial layout cost: ${items[0].cost}`}</div>
const MinimalCost = ({ minimalCostItem }) => minimalCostItem && <div>{`Minimal layout cost: ${minimalCostItem.cost}`}</div>
const BestExchange = ({ minimalCostItem }) => {
    if (!minimalCostItem) {
        return null;
    }
    const { exchange } = minimalCostItem;

    return exchange.titles ?
        <div>{`Best exchange: ${exchange.titles.join(' with ')}`}</div>
        :
        <div>This is the best layout found</div>
}

const mapStateToProps = state => {
    return {
        running: isIterationRunning(state),
        complete: isIterationComplete(state),
        canceled: isIterationCanceled(state),
        percentComplete: getPercentCompletionOfRunningIteration(state),
        items: getCurrentIterationItems(state),
        isSavingLayout: isSavingLayout(state),
    }
}

const mapDispatchToProps = dispatch => ({
    cancelCraftIteration() {
        dispatch(cancelCraftSingleIteration())
    },
    nextCraftIteration(exchange, craftIterations) {
        swapWorkplacesPosition(...exchange.workplaces)
        dispatch(startCraftSingleIteration({ craftIterations }))
    },
    saveCurrentLayout() {
        dispatch(sendHallWithWorkplaces())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CraftNotification)