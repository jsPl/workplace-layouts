import React from 'react';
import { notification, Progress, Button } from 'antd';
import { connect } from 'react-redux';
import minBy from 'lodash/minBy';
import {
    isIterationRunning, isIterationComplete, isIterationCanceled, cancelCraftSingleIteration,
    getPercentCompletionOfRunningIteration, getCurrentIterationItems,
} from '../../redux/craft';

const key = 'craft-notification';

class CraftNotification extends React.Component {
    componentDidUpdate(prevProps) {
        const { running, complete, canceled, percent, items, cancelCraftIteration } = this.props;

        const type = complete ? 'success' : (canceled ? 'error' : 'info');
        const stateText = running ? 'in progress...' : (complete ? 'complete' : (canceled ? 'canceled' : ''));
        const closeBtn = !complete && <Button type='primary' size='small' disabled={canceled} onClick={() => cancelCraftIteration()}>Cancel</Button>;

        const description =
            <Description
                items={items}
                percent={percent}
                complete={complete}
            />

        if (running || complete || canceled) {
            notification[type]({
                message: `Craft iteration: ${stateText}`,
                description,
                key,
                btn: closeBtn,
                duration: 0,
            });
        }
    }

    render() {
        return <></>
    }
}

const Description = ({ items, percent, complete }) => {
    const minimalCostItem = complete && minBy(items, 'cost');
    const text =
        <span className='text'>
            <InitialCost items={items} />
            <MinimalCost minimalCostItem={minimalCostItem} />
            <BestExchange minimalCostItem={minimalCostItem} />
        </span>

    return (
        <div>
            {!complete && <Progress type='circle' percent={percent} width={45} />}
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
        <div>No exchange is necessary in current layout</div>
}

const mapStateToProps = state => {
    return {
        running: isIterationRunning(state),
        complete: isIterationComplete(state),
        canceled: isIterationCanceled(state),
        percent: getPercentCompletionOfRunningIteration(state),
        items: getCurrentIterationItems(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelCraftIteration() {
            dispatch(cancelCraftSingleIteration())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CraftNotification)