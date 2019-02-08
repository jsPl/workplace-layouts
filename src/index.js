import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InitKeyboardEventHandlers from './util/keyboard';
import { store } from './configureStore';
import './observeStore';
import ControlPanel from './components/ControlPanel';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <ControlPanel />
    </Provider>,
    document.getElementById('ui')
);

InitKeyboardEventHandlers();