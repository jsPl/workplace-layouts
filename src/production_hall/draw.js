import { drawSvg, GRID_SIZE } from '../util/draw'
import 'svg.draw.js'
import { store } from '../configureStore';
import { updateProductionHall, toggleDrawingMode } from '../actions'

export function handleProductionHallDrawing(isDrawingMode) {
    //console.log('handleDrawing isDrawingMode', isDrawingMode);

    if (!isDrawingMode) {
        return;
    }

    const drawing = drawSvg.polygon().addClass('productionHall')
        .draw({ snapToGrid: GRID_SIZE });

    const keydownEventListener = ['keydown', e => handleKeydown(e, drawing)];
    document.addEventListener(...keydownEventListener);

    drawing.on('drawdone', () => {
        //console.log('drawdone');
        let { width, height } = drawing.rbox();

        store.dispatch(updateProductionHall({
            polygonPoints: drawing.array().toString(),
            width, height
        }));

        drawing.remove();
    });

    // done or cancel
    drawing.on('drawstop', evt => {
        //console.log('drawstop/cancel');
        document.removeEventListener(...keydownEventListener);
        store.dispatch(toggleDrawingMode(false));
    });
}

const handleKeydown = (evt, svg) => {
    //console.log('drawing handleKeydown', evt.keyCode, 'svg', svg);

    const handleEscOrEnter = (evt, svg, handleKeydown) => {
        const isPolygon = svg.array().value.length > 1;
        if (isPolygon) {
            handleKeydown();
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