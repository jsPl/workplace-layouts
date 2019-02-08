import { drawSvg, GRID_SIZE } from '../util/draw'
import 'svg.draw.js'
import { store } from '../configureStore';
import { updateProductionHall, toggleDrawingMode } from '../actions'

export function handleProductionHallDrawing(isDrawingMode) {
    console.log('handleDrawing isDrawingMode', isDrawingMode);

    if (!isDrawingMode) {
        return null;
    }

    const keydownEventListener = ['keydown', e => handleKeydown(e, drawing)];

    const drawing = drawSvg.polygon().addClass('productionHall')
        .draw({ snapToGrid: GRID_SIZE });

    document.addEventListener(...keydownEventListener);

    // drawing.on('drawstart', function (e) {
    //     console.log('drawstart');
    // });

    drawing.on('drawdone', () => {
        console.log('drawdone');
        let { width, height } = drawing.rbox();

        store.dispatch(updateProductionHall({
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
        store.dispatch(toggleDrawingMode(false));
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