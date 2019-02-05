import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SVG from 'svg.js';
import './production_hall/ProductionHall';
import InitKeyboardEventHandlers from './util/keyboard';
import { store } from './reducers';
import ControlPanel from './components/ControlPanel';
import { Provider } from 'react-redux';

SVG.on(document, 'DOMContentLoaded', () => {
    //productionHall.render();

    // console.log('initial state', store.getState());

    ReactDOM.render(
        <Provider store={store}>
            <ControlPanel />
        </Provider>,
        document.getElementById('ui')
    );
});

InitKeyboardEventHandlers();