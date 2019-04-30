// import SVG from 'svg.js';
// import { drawSvg, panZoom } from './draw';
import { getPanZoomSvgEl } from './panZoom';
import { calculateDistanceData, claculateFlowPairs, claculateFlowData } from './craft.calculation';

class Craft {
    constructor(options = {}) {
        this.options = options;
        this.workplaces = options.workplaces || [];
        this.operationsByProcess = options.operationsByProcess || {};

        //console.log('operationsByProcess', this.operationsByProcess)
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

    calculateCostData = () => {

    }

    calculateFlowData = () => {
        const pairs = Object.values(this.operationsByProcess).flatMap(operations => claculateFlowPairs(operations));
        const flowData = claculateFlowData(pairs);
        //console.log('pairs', pairs, 'flowData', flowData)
        return flowData
    }

    calculateLayoutCost = () => {
        const distanceData = this.calculateDistanceData();
        const flowData = this.calculateFlowData();
        const sum = (a, c) => a + c;
        const distance = (id1, id2) => (distanceData[id1] && distanceData[id1][id2]) || distanceData[id2][id1];
        const cost = (id1, id2) => 1;

        const summands = Object.entries(flowData).map(([idFrom, idsTo]) => {
            const movementCost = idsTo.map(idTo => distance(idFrom, idTo) * cost(idFrom, idTo));
            const total = movementCost.reduce(sum);
            console.log(idFrom, ' to ', idsTo, 'movementCost', movementCost, 'total', total)
            return total
        })
        console.log(summands, summands.reduce(sum))
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