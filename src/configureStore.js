import { createStore } from 'redux'
import rootReducer from './reducers'

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

export const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

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
