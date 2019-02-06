import { combineReducers } from 'redux'

const workplaces = (state = [], action) => {
    switch (action.type) {
        case 'ADD_WORKPLACE':
            return [...state, { ...action }]
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
    selectedWorkplace: null
}, action) => {
    switch (action.type) {
        case 'TOGGLE_DRAWING_MODE':
            return { ...state, isDrawingMode: !state.isDrawingMode }
        case 'SELECT_WORKPLACE':
            return { ...state, selectedWorkplace: action.id };
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