import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';

const initialState = {
    //productionHall: null,
    // productionHall: {
    //     title: 'some strange hall',
    //     points: '460,100 720,100 740,260 360,280',
    //     width: 380,
    //     height: 180
    // },
    // workplaces: [
    //     { id: 1, title: 'wp1', color: '#e5c8e7', width: 200, height: 100, y: 200 },
    //     { id: 2, title: 'wp2', color: '#309EFF' },
    //     { id: 3, title: 'wp3', color: '#FFCF60', x: 300, width: 40, height: 40 },
    //     { id: 4, title: 'wp4', color: '#46ccac', x: 500 }
    // ],
    // appUi: {
    //     isDrawingMode: false,
    //     selectedWorkplace: null
    // }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();

const configureStore = () => {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(epicMiddleware))
    );
    epicMiddleware.run(rootEpic);
    return store;
}

export const store = configureStore();