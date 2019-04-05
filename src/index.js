import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InitKeyboardEventHandlers from './modules/utils/keyboard';
import './redux/observeStore';
import App from './App';

ReactDOM.render(<App />, document.getElementById('ui'));

InitKeyboardEventHandlers();