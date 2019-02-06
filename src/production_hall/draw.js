import { drawSvg, GRID_SIZE } from '../util/draw'
import 'svg.draw.js'
import { store, observeStore } from '../reducers'
import * as actions from '../actions'

document.addEventListener('DOMContentLoaded', () => {
    let productionHallSvg = null;
    observeStore(store,
        state => state.appUi.isDrawingMode,
        isDrawingMode => productionHallSvg = handleDrawing(isDrawingMode, productionHallSvg));
});

function handleDrawing(isDrawingMode, currentDrawing) {
    console.log('handleDrawing isDrawingMode', isDrawingMode, currentDrawing);

    if (!isDrawingMode) {
        if (currentDrawing) {
            const isPolygon = currentDrawing.array().value.length > 1;
            if (isPolygon) {
                console.log('stop drawing current element');
                currentDrawing.draw('done');
                currentDrawing.off('drawstart');
            }
            else {
                currentDrawing.off('drawstart');
                currentDrawing.remove();
            }
        }
        return null;
    }

    const keydownEventListener = ['keydown', e => handleKeydown(e, drawing)];

    const drawing = drawSvg.polygon().addClass('productionHall')
        .draw({ snapToGrid: GRID_SIZE });

    document.addEventListener(...keydownEventListener);

    drawing.on('drawstart', function (e) {
        console.log('drawstart');
    });

    drawing.on('drawdone', () => {
        console.log('drawdone');
        let { width, height } = drawing.rbox();

        store.dispatch(actions.updateProductionHall({
            title: 'New production hall',
            points: drawing.array().toString(),
            width, height
        }));

        drawing.remove();
    });

    // drawing.on('drawcancel', evt => {
    //     console.log('drawcancel', evt.detail);
    // });

    // done or cancel
    drawing.on('drawstop', (evt) => {
        console.log('drawstop');
        document.removeEventListener(...keydownEventListener);
        store.dispatch(actions.toggleDrawingMode(false));
    });

    return drawing;
}

const handleKeydown = (evt, svg) => {
    console.log('handleKeydown', evt.keyCode, 'svg', svg);

    const handleEscOrEnter = (evt, svg, onKeydown) => {
        const isPolygon = svg.array().value.length > 1;
        if (isPolygon) {
            onKeydown();
        }
        else {
            // handleDrawstop(evt);
        }
    }

    if (evt.keyCode === 13) {
        handleEscOrEnter(evt, svg, () => {
            svg.draw('done');
            svg.off('drawstart');
        })
    }
    if (evt.keyCode === 27) {
        handleEscOrEnter(evt, svg, () => {
            svg.draw('cancel');
        })
    }
}