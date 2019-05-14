import SVG from 'svg.js';
import { initPanZoom } from './panZoom.js';
import { store } from '../../redux/configureStore';
import { fetchHallWithWorkplaces } from '../../redux/workplace';
import '../../assets/svg.topath';

window.addEventListener('load', () => {
    const svgContainer = SVG('svg-container');
    drawSvg = svgContainer.size('100%', '100%').addClass('drawSvg');

    const gridPattern = drawSvg.pattern(GRID_SIZE, GRID_SIZE, drawGridPattern);
    panZoom = initPanZoom(svgContainer, gridPattern);

    drawGradientsAndMarkers(drawSvg);

    svgContainer.rect('100%', '100%').back().fill(gridPattern);
    panZoom.resize();

    store.dispatch(fetchHallWithWorkplaces());
});

export const GRID_SIZE = 15;
const drawGridPattern = add => add.path(`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`).addClass('grid');

export const snapToGrid = (x, y, elem) => ({
    x: x - (x % GRID_SIZE),
    y: y - (y % GRID_SIZE)
})

const drawGradientsAndMarkers = draw => {
    draw.defs().svg(`
        <linearGradient id="grad-workplace" gradientTransform="rotate(90 0.5 0.5)">
            <stop offset="0" stop-color="var(--color-start)" />
            <stop offset="0.8" stop-color="var(--color-mid)" />
            <stop offset="1" stop-color="var(--color-end)" />
        </linearGradient>
        <linearGradient id="grad-workplace-selected" gradientTransform="rotate(90 0.5 0.5)">
            <stop offset="0" stop-color="var(--color-start)" />
            <stop offset="1" stop-color="var(--color-end)" />
        </linearGradient>
        <linearGradient id="grad-workplace-colliding" gradientTransform="rotate(90 0.5 0.5)">
            <stop offset="0" stop-color="var(--color-start)" />
            <stop offset="1" stop-color="var(--color-end)" />
        </linearGradient>
        <linearGradient id="grad-workplace-fixed" gradientTransform="rotate(90 0.5 0.5)">
            <stop offset="0" stop-color="var(--color-start)" />
            <stop offset="0.8" stop-color="var(--color-mid)" />
            <stop offset="1" stop-color="var(--color-end)" />
        </linearGradient>        
        <marker id="marker-ruler" markerWidth="1" markerHeight="6" refY="3" orient="auto">
            <rect width="1" height="6" />
        </marker>
        <marker id="connectable-marker-triangle" markerWidth="5" markerHeight="15" refX="20" refY="15" 
            viewBox="0 0 30 30" orient="auto" markerUnits="strokeWidth" fill="#000000">
            <path d="M 0 0 L 30 15 L 0 30 z"></path>
        </marker>        
    `);
}

export let drawSvg;
export let panZoom;

export const SvgClassname = {
    get(obj) {
        return obj.data('className')
    },
    set(obj, className) {
        obj.data('className', className)
    }
}