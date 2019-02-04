import SVG from 'svg.js'
import 'svg.draw.js'

SVG.on(document, 'DOMContentLoaded', () => {
    drawSvg = SVG('svg-container').size('100%', '100%').addClass('drawSvg');
    let polyDraw = drawSvg.polygon().addClass('productionHall').draw({ snapToGrid: 20 });

    polyDraw.on('drawstart', function (e) {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                polyDraw.draw('done');
                polyDraw.off('drawstart');
            }
            if (e.keyCode === 27) {
                polyDraw.draw('cancel');
            }
        });
    });

    polyDraw.on('drawstop', function () {
        console.log('drawstop');
    });

    polyDraw.on('drawcancel', (evt) => {
        console.log('drawcancel', evt.detail);
    });

    polyDraw.on('drawupdate', (evt) => {
        console.log('drawupdate', evt.detail.p);
    });

    polyDraw.on('drawpoint', (evt) => {
        console.log('drawpoint', evt.detail.p);
    });
});

export let drawSvg;