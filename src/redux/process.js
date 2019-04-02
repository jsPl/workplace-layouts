import { createSelector } from 'reselect';

const PROCESS_ADD = 'PROCESS_ADD';
const PROCESS_SELECT = 'PROCESS_SELECT';

const initialState = {
    processes: [],
    selected: [],
}

// Reducers
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PROCESS_ADD:
            return { ...state, processes: processes(state.processes, action) }
        case PROCESS_SELECT:
            return { ...state, selected: action.ids }
        default:
            return state
    }
}

const processes = (state = [], action) => {
    switch (action.type) {
        case PROCESS_ADD:
            if (state.find(o => o.id === action.data.id)) {
                return state;
            }
            return [...state, { ...action.data }];
        default:
            return state
    }
}

// Action creators
export const addProcess = data => ({ type: PROCESS_ADD, data })
export const selectProcess = ids => ({ type: PROCESS_SELECT, ids })

// Selectors
export const getProcesses = state => state.process.processes;
export const getProcessesByFilter = createSelector(
    getProcesses, (state, props) => props.filter,
    (processes, filter) => {
        if (filter === null || filter.trim() === '') {
            return processes;
        }
        return processes.filter(o => o.title.toLowerCase().includes(filter.toLowerCase()))
    }
)

export const getSelectedProcessesId = state => state.process.selected;