import { getPanZoomSvgEl } from './panZoom';
import {
    calculateDistanceData, claculateFlowPairs, claculateFlowData, calculateCostData, claculatePossibleSwaps
} from './craft.calculation';
import { toFixed } from '../utils/conversion';
import { Observable } from 'rxjs';

class Craft {
    constructor(options = {}) {
        this.options = options;
        this.workplaces = options.workplaces || [];
        this.operationsByProcess = options.operationsByProcess || {};
        //console.log('operationsByProcess', this.operationsByProcess)
    }

    static getCentroid = (workplace, relativeTo = getPanZoomSvgEl()) => {
        return workplace.getCenter(relativeTo)
    }

    static getDistance = (centroid1, centroid2) => {
        // Rectilinear distance
        return toFixed(Math.abs(centroid2.x - centroid1.x) + Math.abs(centroid2.y - centroid1.y))
    }

    calculateFlowPairs() {
        if (!this.flowPairs) {
            this.flowPairs = Object.values(this.operationsByProcess).flatMap(operations => claculateFlowPairs(operations));
        }
        return this.flowPairs;
    }

    calculateDistanceData() {
        const distanceCalculationFun = (id1, id2) => {
            const centroid1 = Craft.getCentroid(this.workplaces.find(o => o.id === id1));
            const centroid2 = Craft.getCentroid(this.workplaces.find(o => o.id === id2));

            return Craft.getDistance(centroid1, centroid2)
        }
        return calculateDistanceData(this.workplaces.map(o => o.id), distanceCalculationFun)
    }

    calculateCostData() {
        const costData = calculateCostData(this.calculateFlowPairs());
        //console.log('calculateCostData', costData)
        return costData
    }

    calculateFlowData() {
        const flowData = claculateFlowData(this.calculateFlowPairs());
        //console.log('calculateFlowData', flowData)
        return flowData
    }

    calculatePossibleSwaps() {
        const flowData = this.calculateFlowData();
        const distanceData = this.calculateDistanceData();
        const fixedWorkplaces = this.workplaces.filter(o => o.fixedPosition);

        // console.log('flowData', flowData)
        // console.log('distanceData', distanceData)
        // const swapsFromFlow = claculatePossibleSwapsFromFlowData(flowData);
        // const swapsFromDistance = claculatePossibleSwapsFromDistanceData(distanceData);
        const swaps = claculatePossibleSwaps(flowData, distanceData, fixedWorkplaces);

        // console.log('claculatePossibleSwapsFromFlowData', swapsFromFlow)
        // console.log('claculatePossibleSwapsFromDistanceData', swapsFromDistance)
        // console.log('swaps', swaps)
        return swaps;
    }

    calculateLayoutCostPromise = () => new Promise(resolve => {
        resolve(this.calculateLayoutCost());
    })

    calculateLayoutCostObservable = () => new Observable(subscriber => {
        subscriber.next(this.calculateLayoutCost());
        subscriber.complete();
    })

    calculateLayoutCost() {
        //console.log('calculateLayoutCost')
        const distanceData = this.calculateDistanceData();
        const flowData = this.calculateFlowData();
        const costData = this.calculateCostData();

        //console.log('distanceData', distanceData)
        // console.log('flowData', flowData)
        // console.log('costData', costData)

        const sum = (a, c) => a + c;
        const distance = (id1, id2) => {
            return (distanceData[id1] && distanceData[id1][id2]) || distanceData[id2][id1];
        };
        const cost = (id1, id2) => {
            const result = (costData[id1] && costData[id1][id2]) || costData[id2][id1];
            //console.log('cost ', id1, ' - ', id2, result);
            return result;
        };

        const summands = Object.entries(flowData).map(([idFrom, idsTo]) => {
            const movementCost = idsTo.map(idTo => distance(idFrom, idTo) * cost(idFrom, idTo));
            const total = movementCost.reduce(sum);
            //console.log(idFrom, ' to ', idsTo, 'movementCost', movementCost, 'total', total)
            return total
        })
        const layoutCost = parseInt(summands.reduce(sum, 0), 10);
        //console.log(summands, layoutCost);
        //console.log('cost', layoutCost)
        return layoutCost
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