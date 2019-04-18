// import SVG from 'svg.js';
// import { drawSvg, panZoom } from './draw';
import { getPanZoomSvgEl } from './panZoom';
import { calculateDistanceData } from './craft.calculation';

class Craft {
    constructor(options = {}) {
        this.options = options;
        this.workplaces = options.workplaces || [];
        this.operationsByProcess = options.operationsByProcess || {};

        console.log('operationsByProcess', this.operationsByProcess)
    }

    static getCentroid = (workplace, relativeTo = getPanZoomSvgEl()) => {
        const box = workplace.rectBbox.rbox(relativeTo);
        return { x: box.cx, y: box.cy }
    }

    static getDistance = (centroid1, centroid2) => {
        // Rectilinear distance
        return Math.abs(centroid2.x - centroid1.x) + Math.abs(centroid2.y - centroid1.y)
    }

    calculateDistanceData = () => {
        const distanceCalculationFun = (id1, id2) => {
            const centroid1 = Craft.getCentroid(this.workplaces.find(o => o.id === id1));
            const centroid2 = Craft.getCentroid(this.workplaces.find(o => o.id === id2));

            return Craft.getDistance(centroid1, centroid2)
        }
        return calculateDistanceData(this.workplaces.map(o => o.id), distanceCalculationFun)
    }

    calculateFlowData = () => {

    }

    logCentroids = (options = { draw: false }) => {
        this.workplaces.forEach(o => {
            const centroid = Craft.getCentroid(o);
            console.log(o.title, centroid);

            if (options.draw) {
                const existing = o.svg.select('.centroid').first();
                existing && existing.remove();
                const { x, y } = Craft.getCentroid(o, o.svg);
                o.svg.circle(5).fill('#f06').addClass('centroid').center(x, y);
            }
        })
    }
}

export default Craft