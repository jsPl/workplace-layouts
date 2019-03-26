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

const appUi = (state = {
    isMeasureToolMode: false,
    selectedWorkplaces: [],
    isLoadingWorkplaces: false,
    isSaving: false,
    message: null,
    isSvgWorkplacePictureVisible: settings.getSvgWorkplaceImageVisible(),
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
        default:
            return state
    }
}

const rootReducer = combineReducers({
    productionHall,
    workplaces,
    processes,
    appUi
})

export default rootReducer;