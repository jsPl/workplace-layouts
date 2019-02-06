import { createStore, combineReducers } from 'redux'

const initialState = {
    productionHall: null,
    // productionHall: {
    //     title: 'some strange hall',
    //     points: '460,100 720,100 740,260 360,280',
    //     width: 380,
    //     height: 180
    // },
    workplaces: [
        { id: 1, title: 'wp1', color: '#e5c8e7', width: 200, height: 100, y: 200 },
        { id: 2, title: 'wp2', color: '#309EFF' },
        { id: 3, title: 'wp3', color: '#FFCF60', x: 300, width: 40, height: 40 },
        { id: 4, title: 'wp4', color: '#46ccac', x: 500 }
    ],
    appUi: {
        isDrawingMode: false,
        selectedWorkplace: null
    }
}

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

const svgLayoutsApp = combineReducers({
    productionHall,
    workplaces,
    appUi
})

/**
 * https://github.com/reduxjs/redux/issues/303#issuecomment-125184409
 * @param {Object} store 
 * @param {Function} select 
 * @param {Function} onChange 
 */
export function observeStore(store, select, onChange) {
    let currentState;

    function handleChange() {
        let nextState = select(store.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}

export const store = createStore(
    svgLayoutsApp,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)