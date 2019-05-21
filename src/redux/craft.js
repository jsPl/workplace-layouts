import { createSelector } from 'reselect';
import minBy from 'lodash/minBy';

export const CRAFT_CALCULATE_CURRENT_LAYOUT_COST_START = 'CRAFT_CALCULATE_CURRENT_LAYOUT_COST_START';
export const CRAFT_CALCULATE_CURRENT_LAYOUT_COST_COMPLETE = 'CRAFT_CALCULATE_CURRENT_LAYOUT_COST_COMPLETE';

export const CRAFT_SINGLE_ITERATION_START = 'CRAFT_SINGLE_ITERATION_START';
export const CRAFT_SINGLE_ITERATION_CANCEL = 'CRAFT_SINGLE_ITERATION_CANCEL';
export const CRAFT_SINGLE_ITERATION_NEXT = 'CRAFT_SINGLE_ITERATION_NEXT';
export const CRAFT_SINGLE_ITERATION_COMPLETE = 'CRAFT_SINGLE_ITERATION_COMPLETE';

const currentIterationState = {
    running: false,
    complete: false,
    values: [],
    total: 0,
}

const initialState = {
    currentIteration: currentIterationState
}

export default function reducer(state = initialState, action) {
    if (action.type.startsWith('CRAFT_SINGLE_ITERATION_')) {
        return { ...state, currentIteration: currentIteration(state.currentIteration, action) }
    }
    return state
}

const currentIteration = (state = currentIterationState, action) => {
    switch (action.type) {
        case CRAFT_SINGLE_ITERATION_START:
            return { ...state, running: true, complete: false, total: action.payload.craftIterations.length, values: [] }
        case CRAFT_SINGLE_ITERATION_CANCEL:
            return { ...state, running: false, complete: false }
        case CRAFT_SINGLE_ITERATION_NEXT:
            const { exchange, cost } = action.payload.craftIteration;
            return { ...state, values: [...state.values, { cost, exchange }] }
        case CRAFT_SINGLE_ITERATION_COMPLETE:
            return { ...state, running: false, complete: true }
        default:
            return state
    }
}

// Action creators
export const startCraftSingleIteration = payload => ({ type: CRAFT_SINGLE_ITERATION_START, payload });
export const completeCraftSingleIteration = payload => ({ type: CRAFT_SINGLE_ITERATION_COMPLETE, payload });
export const nextCraftSingleIteration = payload => ({ type: CRAFT_SINGLE_ITERATION_NEXT, payload });
export const cancelCraftSingleIteration = () => ({ type: CRAFT_SINGLE_ITERATION_CANCEL });

export const calculateCurrentLayoutCostStart = payload => ({ type: CRAFT_CALCULATE_CURRENT_LAYOUT_COST_START, payload });
export const calculateCurrentLayoutCostComplete = payload => ({
    type: CRAFT_CALCULATE_CURRENT_LAYOUT_COST_COMPLETE,
    message: {
        type: 'info',
        message: `Current layout cost: ${payload.cost}`
    }
});

// Selectors
export const isIterationRunning = ({ craft }) => craft.currentIteration.running;
export const isIterationComplete = ({ craft }) => craft.currentIteration.complete;
export const isIterationCanceled = createSelector(isIterationRunning, isIterationComplete, (running, complete) => !running && !complete)
export const getCurrentIterationItems = ({ craft }) => craft.currentIteration.values;
export const getCurrentIterationTotalCount = ({ craft }) => craft.currentIteration.total;
export const getCurrentIterationCurrentCount = state => getCurrentIterationItems(state).length;
export const getPercentCompletionOfRunningIteration = createSelector(
    getCurrentIterationTotalCount, getCurrentIterationCurrentCount,
    (total, current) => {
        return total > 0 ? parseInt((current + 1) / total * 100, 10) : 0;
    }
)
export const getCurrentIterationMinimalCost = createSelector(
    getCurrentIterationItems,
    items => minBy(items, 'cost')
)
