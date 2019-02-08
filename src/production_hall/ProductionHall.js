import { drawSvg, snapToGrid } from '../util/draw'
import { generateRandomString } from '../util/utils'

class ProductionHall {
    constructor(options = {}) {
        this.id = generateRandomString();
        Object.assign(this, options);
    }

    render = (points) => {
        this.svg = drawSvg.polygon(points).toPath(true).draggy(snapToGrid).addClass('productionHall').back();
        return this;
    }
}

export const handleProductionHallStateChange = (current, prev) => {
    console.log('handleProductionHallStateChange from ', prev, ' to ', current);

    if (!productionHall && current) {
        productionHall = new ProductionHall(current);
        console.log('new productionHall', productionHall);

        if (current.points) {
            console.log('render with points', current);
            productionHall.render(current.points);
        }
    }
}

export let productionHall = null;