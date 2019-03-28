import { combineReducers } from 'redux';
import * as types from './actionTypes';
import { settings } from './util/settings';

const workplaces = (state = [], action) => {
    switch (action.type) {
        case types.WORKPLACE_ADD:
            if (state.find(o => o.id === action.data.id)) {
                return state;
            }
            return [...state, { ...action.data }];
        case types.WORKPLACE_REMOVE:
            return state.filter(workplace => workplace.id !== action.id)
        case types.WORKPLACE_UPDATE:
            return state.map(workplace =>
                (workplace.id === action.id)
                    ? { ...workplace, ...action.data }
                    : workplace
            )
        default:
            return state
    }
}

const processes = (state = [], action) => {
    switch (action.type) {
        case types.PROCESS_ADD:
            if (state.find(o => o.id === action.data.id)) {
                return state;
            }
            return [...state, { ...action.data }];
        default:
            return state
    }
}

const operations = (state = [], action) => {
    switch (action.type) {
        case types.OPERATION_ADD:
            if (state.find(o => o.id === action.data.id)) {
                return state;
            }
            return [...state, { ...action.data }];
        case types.OPERATION_REMOVE:
            return state.filter(o => o.id !== action.id)
        case types.OPERATION_REMOVE_ALL:
            return []
        default:
            return state
    }
}

const operationsByProcess = (state = {}, action) => {
    switch (action.type) {
        case types.OPERATION_ADD:
        case types.OPERATION_REMOVE:
        case types.OPERATION_REMOVE_ALL:
            const processId = action.process_id;
            return { ...state, [processId]: operations(state[processId], action) }
        default:
            return state
    }
}

const operationsReducer = combineReducers({
    byProcess: operationsByProcess
})

const productionHall = (state = {}, action) => {
    switch (action.type) {
        case types.PRODUCTION_HALL_UPDATE:
            return { ...state, ...action.data }
        case types.PRODUCTION_HALL_LAYOUT_CLEAR: {
            const { polygonPoints, ...hall } = state;
            return hall;
        }
        default:
            return state
    }
}

const ui = (state = {
    isMeasureToolMode: false,
    selectedWorkplaces: [],
    selectedProcesses: [],
    isLoadingWorkplaces: false,
    isLoadingOperations: false,
    isSaving: false,
    message: null,
    isSvgWorkplacePictureVisible: settings.getSvgWorkplaceImageVisible(),
    selectedItemsActiveTab: 'workplaces'
}, action) => {
    switch (action.type) {
        case types.TOOLS_MEASURE_TOGGLE:
            return { ...state, isMeasureToolMode: !state.isMeasureToolMode }
        case types.WORKPLACE_SELECT:
            return { ...state, selectedWorkplaces: action.ids }
        case types.WORKPLACE_FETCH:
        case types.PRODUCTION_HALL_WITH_WORKPLACES_FETCH:
            return { ...state, isLoadingWorkplaces: true }
        case types.PRODUCTION_HALL_WITH_WORKPLACES_SEND:
            return { ...state, isSaving: true }
        case types.PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS:
            return { ...state, isSaving: false, message: action.success }
        case types.PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE:
            return { ...state, isSaving: false, message: action.error }
        case types.WORKPLACE_FETCH_SUCCESS:
            return { ...state, isLoadingWorkplaces: false, message: null }
        case types.WORKPLACE_FETCH_FAILURE:
            return { ...state, isLoadingWorkplaces: false, message: action.error }
        case types.SVG_WORKPLACE_PICTURE_VISIBILITY_CHANGE:
            return { ...state, isSvgWorkplacePictureVisible: action.visible }

        case types.OPERATIONS_FETCH:
            return { ...state, isLoadingOperations: true }
        case types.OPERATIONS_FETCH_SUCCESS:
            return { ...state, isLoadingOperations: false, message: null }
        case types.OPERATIONS_FETCH_FAILURE:
            return { ...state, isLoadingOperations: false, message: action.error }

        case types.PROCESS_SELECT:
            return { ...state, selectedProcesses: action.ids }

        case types.UI_SELECTED_ITEMS_ACTIVE_TAB_CHANGE:
            return { ...state, selectedItemsActiveTab: action.selectedItemsActiveTab }

        default:
            return state
    }
}

const rootReducer = combineReducers({
    productionHall,
    workplaces,
    processes,
    operations: operationsReducer,
    ui
})

export default rootReducer;