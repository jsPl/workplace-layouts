import { drawSvg, snapToGrid } from '../util/draw';
import { generateRandomString } from '../util/utils';
import { isPathColliding } from '../util/collisions';
import { getPanZoomSvgEl } from '../util/panZoom';

class ProductionHall {
    constructor(options = {}) {
        this.id = generateRandomString();
        Object.assign(this, options);
    }

    isCollidingWith(obj) {
        let coll = isPathColliding(this.svg, obj.getSvgForCollisionCalculation());
        //console.log('hall isCollidingWith', obj.getSvgForCollisionCalculation().node, coll)
        return coll;
    }

    drawSvg = (polygonPoints) => {
        let group = drawSvg.group();
        group.polygon(polygonPoints).toPath(true).addClass('productionHall').back();
        group.draggy(snapToGrid)

        group.addTo(getPanZoomSvgEl());
        this.svg = group;
    }
}

export const handleProductionHallStateChange = (current, prev) => {
    //console.log('handleProductionHallStateChange from ', prev, ' to ', current);

    if (current) {
        if (!productionHall) {
            productionHall = new ProductionHall(current);
            //console.log('new productionHall', productionHall);
        }

        if (current.polygonPoints) {
            //console.log('render with points', current);
            productionHall.drawSvg(current.polygonPoints);
        }
    }
}

export let productionHall = null;