import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InitKeyboardEventHandlers from './util/keyboard';
import { store } from './configureStore';
import './observeStore';
import { Provider } from 'react-redux';
import ControlPanelContainer from './components/ControlPanelContainer';
import AppSettingsContainer  from './components/settings/AppSettingsContainer';

ReactDOM.render(
    <Provider store={store}>
        <AppSettingsContainer />
        <ControlPanelContainer />
    </Provider>,
    document.getElementById('ui')
);

InitKeyboardEventHandlers();