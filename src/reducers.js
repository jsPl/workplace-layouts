import { combineReducers } from 'redux';
import * as types from './actionTypes';

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

const productionHall = (state = {}, action) => {
    switch (action.type) {
        case types.PRODUCTION_HALL_UPDATE:
            return { ...state, ...action.data }
        default:
            return state
    }
}

const appUi = (state = {
    isDrawingMode: false,
    selectedWorkplace: null,
    isLoadingWorkplaces: false,
    isSaving: false,
    message: null
}, action) => {
    switch (action.type) {
        case types.PRODUCTION_HALL_TOGGLE_DRAWING_MODE:
            return { ...state, isDrawingMode: !state.isDrawingMode }
        case types.WORKPLACE_SELECT:
            return { ...state, selectedWorkplace: action.id }
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
        default:
            return state
    }
}

const rootReducer = combineReducers({
    productionHall,
    workplaces,
    appUi
})

export default rootReducer;