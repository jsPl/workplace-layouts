import { combineReducers } from 'redux'

const workplaces = (state = [], action) => {
    switch (action.type) {
        case 'ADD_WORKPLACE':
            if (state.find(o => o.id === action.data.id)) {
                return state;
            }
            return [...state, { ...action.data }];
        case 'REMOVE_WORKPLACE':
            return state.filter(workplace => workplace.id !== action.id)
        case 'UPDATE_WORKPLACE':
            return state.map(workplace =>
                (workplace.id === action.id)
                    ? { ...workplace, ...action.data }
                    : workplace
            )
        default:
            return state
    }
}

const productionHall = (state = null, action) => {
    switch (action.type) {
        case 'UPDATE_PRODUCTION_HALL':
            return { ...state, ...action.data }
        default:
            return state
    }
}

const appUi = (state = {
    isDrawingMode: false,
    selectedWorkplace: null,
    isLoadingWorkplaces: false,
    error: null
}, action) => {
    switch (action.type) {
        case 'TOGGLE_DRAWING_MODE':
            return { ...state, isDrawingMode: !state.isDrawingMode }
        case 'SELECT_WORKPLACE':
            return { ...state, selectedWorkplace: action.id }
        case 'FETCH_WORKPLACE':
        case 'FETCH_WORKPLACES':
            return { ...state, isLoadingWorkplaces: true }
        case 'FETCH_WORKPLACE_SUCCESS':
            return { ...state, isLoadingWorkplaces: false, error: null }
        case 'FETCH_WORKPLACE_FAILURE':
            return { ...state, isLoadingWorkplaces: false, error: action.error }
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