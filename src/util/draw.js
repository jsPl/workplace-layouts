import SVG from 'svg.js'
import '../production_hall/draw.js'

SVG.on(document, 'DOMContentLoaded', () => {
    drawSvg = SVG('svg-container').size('100%', '100%').addClass('drawSvg');
 });

export let drawSvg;