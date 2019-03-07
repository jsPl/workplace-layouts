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

        // const { w, h } = hallSvg.rbox();
        // store.dispatch(updateProductionHall({ width: toFixed(w), height: toFixed(h) }));

        panZoom.updateBBox().fit().center();//.zoomBy(0.9);
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
            //console.log('new productionHall', productionHall);
        }

        // if (current.polygonPoints && !productionHall.svg) {
        //     //console.log('render with points', current);
        //     productionHall.drawSvg(current.polygonPoints);
        // }

        if (current.svgPath && !productionHall.svg) {
            productionHall.importSvg(current.svgPath);
        }

        // else if (productionHall.svg && !current.polygonPoints) {
        //     productionHall.svg.remove();
        // }

        // if (current.svgPath && !productionHall.svg) {
        //     console.log('current.svgPath', current.svgPath)

        //     fetch(current.svgPath)
        //         .then(response => response.text())
        //         .then(text => {
        //             const hallSvg = getPanZoomSvgEl().svg(text);
        //             const { w, h } = hallSvg.rbox();
        //             //store.dispatch(updateProductionHall({ width: toFixed(w), height: toFixed(h) }));
        //         });
        // }
    }
}

export let productionHall = null;