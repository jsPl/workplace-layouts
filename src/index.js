import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SVG from 'svg.js';
import { productionHall } from './ProductionHall';
import InitKeyboardEventHandlers from './util/keyboard';
import { store } from './reducers';
import ControlPanel from './components/ControlPanel';
import { Provider } from 'react-redux';

SVG.on(document, 'DOMContentLoaded', () => {
    productionHall.render();

    store.subscribe(() => console.log(store.getState()));
    console.log('initial state', store.getState());
});

InitKeyboardEventHandlers();

ReactDOM.render(
    <Provider store={store}>
        <ControlPanel />
    </Provider>,
    document.getElementById('ui')
);