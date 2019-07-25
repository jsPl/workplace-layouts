import { createSelector } from 'reselect';
import minBy from 'lodash/minBy';

export const CRAFT_CALCULATE_CURRENT_LAYOUT_COST_START = 'CRAFT_CALCULATE_CURRENT_LAYOUT_COST_START';
export const CRAFT_CALCULATE_CURRENT_LAYOUT_COST_COMPLETE = 'CRAFT_CALCULATE_CURRENT_LAYOUT_COST_COMPLETE';

export const CRAFT_SINGLE_ITERATION_START = 'CRAFT_SINGLE_ITERATION_START';
export const CRAFT_SINGLE_ITERATION_CANCEL = 'CRAFT_SINGLE_ITERATION_CANCEL';
export const CRAFT_SINGLE_ITERATION_NEXT = 'CRAFT_SINGLE_ITERATION_NEXT';
export const CRAFT_SINGLE_ITERATION_COMPLETE = 'CRAFT_SINGLE_ITERATION_COMPLETE';
const CRAFT_SINGLE_ITERATION_SET_STATUS = 'CRAFT_SINGLE_ITERATION_SET_STATUS';

const CRAFT_SUMMARY_ITERATION_ADD = 'CRAFT_SUMMARY_ITERATION_ADD';
const CRAFT_SUMMARY_ITERATION_CLEAR = 'CRAFT_SUMMARY_ITERATION_CLEAR';
const CRAFT_SUMMARY_VISIBILITY_CHANGE = 'CRAFT_SUMMARY_VISIBILITY_CHANGE';

const currentIterationState = {
    running: false,
    complete: false,
    canceled: false,
    values: [],
    total: 0,
}

const summaryState = {
    iterations: [],
    visible: false,
}

const initialState = {
    currentIteration: currentIterationState,
    summary: summaryState,
}

export default function reducer(state = initialState, action) {
    if (action.type.startsWith('CRAFT_SINGLE_ITERATION_')) {
        return { ...state, currentIteration: currentIteration(state.currentIteration, action) }
    }
    if (action.type.startsWith('CRAFT_SUMMARY_')) {
        return { ...state, summary: summary(state.summary, action) }
    }
    return state;
}

const currentIteration = (state = currentIterationState, action) => {
    switch (action.type) {
        case CRAFT_SINGLE_ITERATION_START:
            return {
                ...state, running: true, complete: false, canceled: false,
                total: action.payload.craftIterations.length, values: []
            }
        case CRAFT_SINGLE_ITERATION_CANCEL:
            return { ...state, running: false, complete: false, canceled: true }
        case CRAFT_SINGLE_ITERATION_NEXT:
            const { craftIteration } = action.payload;
            return { ...state, values: [...state.values, craftIteration] }
        case CRAFT_SINGLE_ITERATION_COMPLETE:
            return { ...state, running: false, complete: true, canceled: false }
        case CRAFT_SINGLE_ITERATION_SET_STATUS:
            const { running = state.running, complete = state.complete, canceled = state.canceled } = action.payload;
            return { ...state, running, complete, canceled }
        default:
            return state
    }
}

const summary = (state = summaryState, action) => {
    switch (action.type) {
        case CRAFT_SUMMARY_ITERATION_ADD:
            const { iteration } = action.payload;
            return { ...state, iterations: [...state.iterations, iteration] };
        case CRAFT_SUMMARY_ITERATION_CLEAR:
            return { ...state, iterations: [] };
        case CRAFT_SUMMARY_VISIBILITY_CHANGE:
            return { ...state, visible: action.payload.visible };
        default:
            return state;
    }
}

// Action creators
export const startCraftSingleIteration = payload => ({ type: CRAFT_SINGLE_ITERATION_START, payload });
export const completeCraftSingleIteration = payload => ({ type: CRAFT_SINGLE_ITERATION_COMPLETE, payload });
export const nextCraftSingleIteration = payload => ({ type: CRAFT_SINGLE_ITERATION_NEXT, payload });
export const cancelCraftSingleIteration = () => ({ type: CRAFT_SINGLE_ITERATION_CANCEL });
export const setStatusCraftSingleIteration = payload => ({ type: CRAFT_SINGLE_ITERATION_SET_STATUS, payload });

export const calculateCurrentLayoutCostStart = payload => ({ type: CRAFT_CALCULATE_CURRENT_LAYOUT_COST_START, payload });
export const calculateCurrentLayoutCostComplete = payload => ({
    type: CRAFT_CALCULATE_CURRENT_LAYOUT_COST_COMPLETE,
    message: {
        type: 'info',
        message: `Current layout cost: ${payload.cost}`
    }
});

export const addCraftSummaryIteration = ({ cost, exchange, layout }) => {
    const { ids, titles } = exchange;
    const iteration = { cost, exchange: { ids, titles }, layout };
  
    //console.log('addCraftSummaryIteration ', exchange, iteration);

    return { type: CRAFT_SUMMARY_ITERATION_ADD, payload: { iteration } }
}
export const clearCraftSummaryIteration = () => ({ type: CRAFT_SUMMARY_ITERATION_CLEAR })
export const changeCraftSummaryVisibility = ({ visible }) => ({ type: CRAFT_SUMMARY_VISIBILITY_CHANGE, payload: { visible } })

// Selectors
export const isIterationRunning = ({ craft }) => craft.currentIteration.running;
export const isIterationComplete = ({ craft }) => craft.currentIteration.complete;
export const isIterationCanceled = ({ craft }) => craft.currentIteration.canceled;
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
export const getSummaryIterations = ({ craft }) => craft.summary.iterations
export const isSummaryVisible = ({ craft }) => craft.summary.visible;