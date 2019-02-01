import { createStore } from 'redux'

export const initialState = {
    productionHall: {
        color: '#faebd7',
        width: 1000,
        height: 350
    },
    workplaces: [
        { id: 1, title: 'wp1', color: '#e5c8e7', width: 200, height: 100, y: 200 },
        { id: 2, title: 'wp2', color: '#309EFF' },
        { id: 3, title: 'wp3', color: '#FFCF60', x: 300, width: 40, height: 40 },
        { id: 4, title: 'wp4', color: '#46ccac', x: 500 }
    ],
    selectedWorkplace: null
}

export const svgLayoutsApp = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_WORKPLACE':
            return Object.assign({}, state, {
                workplaces: [...state.workplaces, {
                    id: action.id, title: action.title, color: action.color,
                    height: action.height, width: action.width
                }]
            })
        case 'REMOVE_WORKPLACE':
            return Object.assign({}, state, {
                workplaces: state.workplaces.filter(o => o.id !== action.id)
            })
        case 'UPDATE_WORKPLACE':
            //console.log('UPDATE_WORKPLACE', action)
            return Object.assign({}, state, {
                workplaces: state.workplaces.map(workplace =>
                    (workplace.id === action.id)
                        ? { ...workplace, ...action.data }
                        : workplace
                )
            })
        case 'SELECT_WORKPLACE':
            return { ...state, selectedWorkplace: action.id };
        case 'UPDATE_SVG_POSITION':
            return Object.assign({}, state, {
                workplaces: state.workplaces.map(workplace =>
                    (workplace.id === action.id)
                        ? { ...workplace, x: action.x, y: action.y }
                        : workplace
                )
            })
        default:
            return state
    }
}

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
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)