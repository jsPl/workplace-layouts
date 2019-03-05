import { drawSvg, panZoom } from '../util/draw';
import { toFixed } from '../util/utils';
import { isPathColliding } from '../util/collisions';
import { getPanZoomSvgEl } from '../util/panZoom';
import { store } from '../configureStore';
import { updateProductionHall } from '../actions';

class ProductionHall {
    constructor(options = {}) {
        Object.assign(this, options);
    }

    isCollidingWith(obj) {
        let coll = isPathColliding(this.svg, obj.getSvgForCollisionCalculation());
        //console.log('hall isCollidingWith', obj.getSvgForCollisionCalculation().node, coll)
        return coll;
    }

    drawSvg = (polygonPoints) => {
        if (!polygonPoints || this.svg) {
            return;
        }

        let group = drawSvg.group();
        group.polygon(polygonPoints).toPath(true).addClass('productionHall');

        //group.draggy(snapToGrid)
        group.addTo(getPanZoomSvgEl()).back();

        this.svg = group;

        const { w, h } = group.rbox();
        store.dispatch(updateProductionHall({ width: toFixed(w), height: toFixed(h) }));

        panZoom.updateBBox().fit().center().zoomBy(0.9);
    }
}

export const handleProductionHallStateChange = (current, prev) => {
    //console.log('handleProductionHallStateChange from ', prev, ' to ', current);

    if (current) {
        if (!productionHall) {
            productionHall = new ProductionHall(current);
            //console.log('new productionHall', productionHall);
        }

        if (current.polygonPoints && !productionHall.svg) {
            //console.log('render with points', current);
            productionHall.drawSvg(current.polygonPoints);
        }
        // else if (productionHall.svg && !current.polygonPoints) {
        //     productionHall.svg.remove();
        // }
    }
}

export let productionHall = null;