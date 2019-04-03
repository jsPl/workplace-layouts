import { getSelectedProcessesId } from './process';

export const OPERATIONS_FETCH = 'OPERATIONS_FETCH';
export const OPERATIONS_FETCH_SUCCESS = 'OPERATIONS_FETCH_SUCCESS';
export const OPERATIONS_FETCH_FAILURE = 'OPERATIONS_FETCH_FAILURE';
const OPERATION_ADD = 'OPERATION_ADD';
const OPERATION_REMOVE = 'OPERATION_REMOVE';
const OPERATION_REMOVE_ALL = 'OPERATION_REMOVE_ALL';

const initialState = {
    byProcess: {},
    selected: [],
}

// Reducers
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OPERATION_ADD:
        case OPERATION_REMOVE:
        case OPERATION_REMOVE_ALL:
            return { ...state, byProcess: operationsByProcess(state.byProcess, action) }
        default:
            return state
    }
}

const operationsByProcess = (state = {}, action) => {
    switch (action.type) {
        case OPERATION_ADD:
        case OPERATION_REMOVE:
        case OPERATION_REMOVE_ALL:
            const processId = action.process_id;
            return { ...state, [processId]: operations(state[processId], action) }
        default:
            return state
    }
}

const operations = (state = [], action) => {
    switch (action.type) {
        case OPERATION_ADD:
            if (state.find(o => o.id === action.data.id)) {
                return state;
            }
            return [...state, { ...action.data }];
        case OPERATION_REMOVE:
            return state.filter(o => o.id !== action.id)
        case OPERATION_REMOVE_ALL:
            return []
        default:
            return state
    }
}

// Action creators
export const addOperation = (process_id, data) => ({ type: OPERATION_ADD, process_id, data })
export const removeOperation = (id, process_id) => ({ type: OPERATION_REMOVE, id, process_id })
export const removeAllOperations = process_id => ({ type: OPERATION_REMOVE_ALL, process_id })
export const fetchOperations = payload => ({ type: OPERATIONS_FETCH, payload })
export const fetchOperationsSuccess = payload => ({ type: OPERATIONS_FETCH_SUCCESS, payload })
export const fetchOperationsFailure = payload => ({ type: OPERATIONS_FETCH_FAILURE, payload })

// Selectors
export const getOperationsOfSelectedProcesses = state => {
    return getSelectedProcessesId(state).flatMap(id => getOperationsByProcess(state, id) || [])
}
export const getOperationsByProcess = (state, processId) => state.operation.byProcess[processId];