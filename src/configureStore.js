import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';

//const composeEnhancers = composeWithDevTools();
const epicMiddleware = createEpicMiddleware();

const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(epicMiddleware))
    );
    epicMiddleware.run(rootEpic);
    return store;
}

export const store = configureStore();