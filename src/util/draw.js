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

        drawGradientWorkplace(drawSvg);

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

const drawGradientWorkplace = draw => {
    draw.defs().svg(`
        <linearGradient id="grad-workplace" gradientTransform="rotate(90 0.5 0.5)">
            <stop offset="0" stop-color="#f5fafc" stop-opacity="1"/>
            <stop offset="0.74" stop-color="#add9e5" stop-opacity="1"/>
            <stop offset="0.83" stop-color="#add9e5" stop-opacity="1"/>
            <stop offset="1" stop-color="#c9e6ed" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="grad-workplace-selected" gradientTransform="rotate(90 0.5 0.5)">
            <stop offset="0" stop-color="#d4efd5" />
            <stop offset="1" stop-color="#72d176" />
        </linearGradient>
        <linearGradient id="grad-workplace-colliding" gradientTransform="rotate(90 0.5 0.5)">
            <stop offset="0" stop-color="#ffdada" />
            <stop offset="1" stop-color="#ffacac" />
        </linearGradient>       
    `);
}

export let drawSvg;
export let panZoom;