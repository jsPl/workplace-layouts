import { combineReducers } from 'redux';
import workplace from './workplace';
import process from './process';
import operation from './operation';
import ui from './ui';
import productionHall from './productionHall';
import craft from './craft';
import api from './api';

export default combineReducers({
    productionHall,
    workplace,
    process,
    operation,
    ui,
    craft,
    api,
})