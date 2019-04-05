import { drawSvg, SvgClassname } from './utils/draw';
import { getPanZoomSvgEl } from './utils/panZoom';
import '../assets/svg.connectable';
import { store } from '../redux/configureStore';
import { getOperationsByProcess } from '../redux/operation';
import { workplaceRepository } from './workplace/workplaceRepository';
import isEqual from 'lodash/isEqual';

class OperationFlow {
    constructor(options = {}) {
        this.options = options;
        this.drawSvg();
        this.attachEvents();
    }

    drawSvg = () => {
        const { operations } = this.options;
        const g = drawSvg.group().addClass('operationFlow');
        const links = g.group();
        const markers = g.group();

        g.addTo(getPanZoomSvgEl()).front();

        operations.forEach(o => {
            const workplace = workplaceRepository.findById(o.default_workplace_id);
            o.workplace = workplace;

            g.text(o.position + '').font('family', '').addClass('position')
                .center(workplace.svg.cx(), workplace.svg.cy());
        })

        const pairs = this.createConnectablePairs(operations);

        pairs.forEach(pair => {
            const [first, second] = pair;
            first.connectable({
                container: links,
                markers: markers,
                marker: 'use:connectable-marker-triangle',
                targetAttach: 'center',
                sourceAttach: 'center',
            }, second);
        })

        this.svg = g;
        SvgClassname.set(this.svg, 'OperationFlow');
        return this;
    }

    attachEvents = () => {
    }

    remove = () => this.svg.remove()

    createConnectablePairs = operations => {
        let pairs = [];
        if (operations.length > 1) {
            let prev = operations[0].workplace.svg;

            for (let i = 1; i < operations.length; i++) {
                const o = operations[i];
                const current = o.workplace.svg;
                pairs.push([prev, current]);
                prev = current;
            }
        }
        return pairs;
    }
}

let existingFlow = null;
export const handleProcessSelectionStateChange = (toIds, fromIds) => {
    if (!isEqual(fromIds, toIds)) {
        const processId = toIds[0];
        const operations = getOperationsByProcess(store.getState(), processId) || [];

        //console.log('handleProcessSelectionStateChange processId', processId, 'operations', operations);

        if (existingFlow) {
            existingFlow.remove();
        }

        if (processId) {
            existingFlow = new OperationFlow({ processId, operations })
        }
    }
}