import SVG from 'svg.js'

SVG.on(document, 'DOMContentLoaded', ()  => {
    drawSvg = SVG("svg-container").size('100%', '100%');
});

export let drawSvg;