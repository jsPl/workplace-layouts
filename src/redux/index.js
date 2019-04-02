import { combineReducers } from 'redux';
import workplace from './workplace';
import process from './process';
import operation from './operation';
import ui from './ui';
import productionHall from './productionHall';

export default combineReducers({
    productionHall,
    workplace,
    process,
    operation,
    ui
})