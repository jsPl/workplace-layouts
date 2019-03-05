import SVG from 'svg.js';
import '../production_hall/draw.js';
import { initPanZoom } from './panZoom.js';
import { store } from '../configureStore';
import { fetchHallWithWorkplaces } from '../actions';

SVG.on(document, 'DOMContentLoaded', () => {
    const svgContainer = SVG('svg-container');

    svgContainer.on('load', () => {
        drawSvg = svgContainer.size('100%', '100%').addClass('drawSvg');

        const gridPattern = drawSvg.pattern(GRID_SIZE, GRID_SIZE, drawGridPattern);
        panZoom = initPanZoom(svgContainer, gridPattern);

        svgContainer.rect('100%', '100%').back().fill(gridPattern);
        panZoom.resize();

        store.dispatch(fetchHallWithWorkplaces());
    });
});

export const GRID_SIZE = 15;
const drawGridPattern = add => add.path(`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`).addClass('grid');

export const snapToGrid = (x, y, elem) => ({
    x: x - (x % GRID_SIZE),
    y: y - (y % GRID_SIZE)
})

export let drawSvg;
export let panZoom;