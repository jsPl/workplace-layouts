import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InitKeyboardEventHandlers from './modules/utils/keyboard';
import { store } from './redux/configureStore';
import './redux/observeStore';
import { Provider } from 'react-redux';
import ControlPanelContainer from './components/panel/ControlPanelContainer';
import AppSettingsContainer  from './components/settings/AppSettingsContainer';
import SelectedItemsContainer from './components/panel/SelectedItemsContainer';

ReactDOM.render(
    <Provider store={store}>
        <AppSettingsContainer />
        <ControlPanelContainer />
        <SelectedItemsContainer />
    </Provider>,
    document.getElementById('ui')
);

InitKeyboardEventHandlers();