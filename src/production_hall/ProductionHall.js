import { panZoom } from '../util/draw';
import { isPathColliding } from '../util/collisions';
import { getPanZoomSvgEl } from '../util/panZoom';

class ProductionHall {
    constructor(options = {}) {
        Object.assign(this, options);
    }

    isCollidingWith(obj) {
        let coll = isPathColliding(this.svg, obj.getSvgForCollisionCalculation());
        //console.log('hall isCollidingWith', obj.getSvgForCollisionCalculation().node, coll)
        return coll;
    }

    drawSvg = svgString => {
        if (this.svg) {
            return this;
        }

        const hallSvg = getPanZoomSvgEl().svg(svgString).select('svg').first().back();
        this.svg = hallSvg;

        panZoom.updateBBox().fit().center();
        return this;
    }

    importSvg = svgPath => {
        if (!svgPath || this.svg) {
            return;
        }

        fetch(svgPath)
            .then(response => response.text())
            .then(svgString => this.drawSvg(svgString));
    }
}

export const handleProductionHallStateChange = (current, prev) => {
    //console.log('handleProductionHallStateChange from ', prev, ' to ', current);

    if (current) {
        if (!productionHall) {
            productionHall = new ProductionHall(current);
        }

        if (current.svgPath && !productionHall.svg) {
            productionHall.importSvg(current.svgPath);
        }
    }
}

export let productionHall = null;