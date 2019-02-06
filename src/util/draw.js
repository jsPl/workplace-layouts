import SVG from 'svg.js'
import '../production_hall/draw.js'

SVG.on(document, 'DOMContentLoaded', () => {
    drawSvg = SVG('svg-container').size('100%', '100%').addClass('drawSvg');
});

export const GRID_SIZE = 20;

export const snapToGrid = (x, y, elem) => ({
    x: x - (x % GRID_SIZE),
    y: y - (y % GRID_SIZE)
})

export let drawSvg;