import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';
import ControlPanelContainer from './components/panel/ControlPanelContainer';
import AppSettingsContainer from './components/settings/AppSettingsContainer';
import SelectedItemsContainer from './components/panel/SelectedItemsContainer';

const App = () => (
    <Provider store={store}>
        <AppSettingsContainer />
        <ControlPanelContainer />
        <SelectedItemsContainer />
    </Provider>
)

export default App;