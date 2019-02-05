import { drawSvg } from '../util/draw'
import 'svg.draw.js'
import { store, observeStore } from '../reducers'
import * as actions from '../actions'

document.addEventListener('DOMContentLoaded', () => {
    let productionHallSvg = null;
    observeStore(store,
        state => state.app.isDrawingMode,
        isDrawingMode => productionHallSvg = handleDrawing(isDrawingMode, productionHallSvg));
});

function handleDrawing(isDrawingMode, currentDrawing) {
    console.log('handleDrawing', isDrawingMode, currentDrawing);

    if (!isDrawingMode) {
        if (currentDrawing) {
            console.log('stop drawing current element');
            currentDrawing.draw('done');
            currentDrawing.off('drawstart');
        }
        return null;
    }

    const drawing = drawSvg.polygon().addClass('productionHall')
        .draw({ snapToGrid: 20 });

    drawing.on('drawstart', function (e) {
        console.log('drawstart');
        document.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                drawing.draw('done');
                drawing.off('drawstart');
            }
            if (e.keyCode === 27) {
                drawing.draw('cancel');
            }
        });
    });

    drawing.on('drawdone', () => {
        console.log('drawdone');
        let { width, height } = drawing.rbox();

        store.dispatch(actions.toggleDrawingMode(false));
        store.dispatch(actions.updateProductionHall({
            title: 'New production hall',
            points: drawing.array().toString(),
            width, height
        }));

        drawing.remove();
    });

    drawing.on('drawcancel', evt => {
        console.log('drawcancel', evt.detail);
        store.dispatch(actions.toggleDrawingMode(false))
    });

    return drawing;
}