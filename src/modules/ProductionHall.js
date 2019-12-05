import { panZoom } from './utils/draw';
import { isPathColliding } from './utils/collisions';
import { getPanZoomSvgEl } from './utils/panZoom';
import { showMessage } from '../redux/ui';
import { store } from '../redux/configureStore';

class ProductionHall {
    constructor(options = {}) {
        Object.assign(this, options);
    }

    isCollidingWith(obj) {
        return isPathColliding(this.svg, obj.getSvgForCollisionCalculation());
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
            .then(response => {
                const expectedContentType = 'image/svg+xml';
                if (response.headers.get('content-type') !== expectedContentType) {
                    throw new Error(`Expected content-type '${expectedContentType}', got '${response.headers.get('content-type')}'`);
                }
                return response.text()
            })
            .then(svgString => this.drawSvg(svgString))
            .catch(err => {
                const message = `Production hall fetch svg: ${err.message}`;
                console.error(message);
                store.dispatch(showMessage({ type: 'error', message, duration: 12 }));
            })
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