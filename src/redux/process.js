import { createSelector } from 'reselect';
import { OPERATIONS_FETCH, OPERATIONS_FETCH_SUCCESS, OPERATIONS_FETCH_FAILURE } from './operation';

const PROCESS_ADD = 'PROCESS_ADD';
const PROCESS_SELECT = 'PROCESS_SELECT';

const initialState = {
    byId: {},
    selected: [],
}

// Reducers
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PROCESS_ADD:
        case OPERATIONS_FETCH:
        case OPERATIONS_FETCH_SUCCESS:
        case OPERATIONS_FETCH_FAILURE:
            return { ...state, byId: byId(state.byId, action) }
        case PROCESS_SELECT:
            return { ...state, selected: action.payload.ids }
        default:
            return state
    }
}

const byId = (state = {}, action) => {
    switch (action.type) {
        case PROCESS_ADD:
            return { ...state, [action.data.id]: process(state[action.data.id], action) }
        case OPERATIONS_FETCH:
        case OPERATIONS_FETCH_SUCCESS:
        case OPERATIONS_FETCH_FAILURE:
            return { ...state, [action.payload.processId]: process(state[action.payload.processId], action) }
        default:
            return state
    }
}

const process = (state = { process: [], loading: false }, action) => {
    switch (action.type) {
        case PROCESS_ADD:
            if (state.process.find(o => o.id === action.data.id)) {
                return state;
            }
            return { ...state, process: action.data }
        case OPERATIONS_FETCH:
            return { ...state, loading: true }
        case OPERATIONS_FETCH_SUCCESS:
        case OPERATIONS_FETCH_FAILURE:
            return { ...state, loading: false }
        default:
            return state
    }
}

// Action creators
export const addProcess = data => ({ type: PROCESS_ADD, data })
export const selectProcess = payload => ({ type: PROCESS_SELECT, payload })

// Selectors
export const getProcesses = state => Object.values(state.process.byId).map(o => o.process);
export const getProcessById = (state, processId) => state.process.byId[processId];
export const getSelectedProcessesId = state => state.process.selected;
export const isLoadingOperations = (state, processId) => getProcessById(state, processId).loading;

export const getProcessesByFilter = createSelector(
    getProcesses, (state, props) => props.filter,
    (processes, filter) => {
        if (filter === null || filter.trim() === '') {
            return processes;
        }
        return processes.filter(o => o.title.toLowerCase().includes(filter.toLowerCase()))
    }
)