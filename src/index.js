import './index.css'
import SVG from 'svg.js'
import { productionHall } from './ProductionHall'
import InitKeyboardEventHandlers from './util/keyboard'

SVG.on(document, 'DOMContentLoaded', () => {
    productionHall.render();

    console.log('workplaces on stage', productionHall.workplaces);
    //console.log(wp1.svg.svg());
});

InitKeyboardEventHandlers();