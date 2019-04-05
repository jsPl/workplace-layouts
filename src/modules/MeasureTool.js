import { drawSvg, GRID_SIZE, panZoom, SvgClassname } from './utils/draw';
import 'svg.draw.js';
import { store } from '../redux/configureStore';
import { toggleMeasureTool, blockPanning } from '../redux/ui';
import { getProductionHall } from '../redux/productionHall';
import { getPanZoomSvgEl } from './utils/panZoom';
import { lengthBetweenTwoPoints } from 'svg.intersections.js';
import { pixelsToMeters, getAngleFromPoint, toFixed } from './utils/conversion';
import isEqual from 'lodash/isEqual';
import '../assets/lineable';
import { selection } from './utils/selection';
import { workplaceRepository } from './workplace/workplaceRepository';

export class MeasureTool {
    constructor(options = { scale: 0.02 }) {
        this.options = options;
        this.drawSvg();
        this.attachEvents();
    }

    drawSvg = () => {
        const group = drawSvg.group().addClass('measureTool');
        this.drawing = group.line().addClass('ruler').draw();
        this.text = group.text('').font('family', '').addClass('distance');

        group.addTo(getPanZoomSvgEl()).front();
        selection.addSelectable(group, this.handleSelection);

        //console.log('MeasureTool', this.drawing, this.drawing.draw.foo, this.drawing.foo)

        this.svg = group;
        SvgClassname.set(this.svg, 'MeasureTool');
        return this;
    }

    handleSelection = evt => {
        this.svg.front();
    }

    handleKeydown = evt => {
        //console.log('measure handleKeydown', evt.key);

        if (evt.key === 'Escape') {
            this.drawing.draw('cancel');
        }
        if (evt.key === 'Control') {
            if (this.shouldChangeSnap()) {
                this.drawing.draw('param', 'snapToGrid', GRID_SIZE);
            }
        }

        if (evt.keyCode >= 37 && evt.keyCode <= 40) {
            const panByKey = {
                'ArrowDown': { y: -50 }, 'ArrowUp': { y: 50 },
                'ArrowLeft': { x: 50 }, ArrowRight: { x: -50 }
            };

            panZoom.panBy({ x: 0, y: 0, ...panByKey[evt.key] })
        }
    }

    handleKeyup = evt => {
        if (this.shouldChangeSnap()) {
            this.drawing.draw('param', 'snapToGrid', 1);
        }
    }

    handleDragStart = evt => {
        if (evt.type !== 'keydown') {
            store.dispatch(blockPanning(true))
        }
    }
    
    handleDragEnd = evt => {
        if (evt.type !== 'keydown') {
            store.dispatch(blockPanning(false))
        }
    }

    shouldChangeSnap = () => {
        const points = this.drawing.array().valueOf();
        return !isEqual(points[0], points[1])
    }

    keydownEventListener = ['keydown', this.handleKeydown]
    keyupEventListener = ['keyup', this.handleKeyup]

    attachEvents = () => {
        document.addEventListener(...this.keydownEventListener);

        this.drawing.on('drawstart', () => {
            //console.log('drawstart');
            document.addEventListener(...this.keyupEventListener);
        });

        this.drawing.on('drawcancel', evt => {
            //console.log('drawcancel', this.svg.node);
            this.clean();
        });

        // done or cancel
        this.drawing.on('drawstop', evt => {
            //console.log('drawstop/cancel');

            this.done();
            this.svg.draggy();

            this.svg.element('title').words('Drag to move or click and press Delete to remove')
        });

        this.drawing.on('drawupdate', ({ detail }) => {
            //console.log('drawupdate', detail.p)

            const points = this.drawing.array().valueOf().flat();
            const distanceInMeters = this.calculateDistanceInMeters(points);
            this.updateDistanceText(distanceInMeters + ' m', points);
        });

        this.svg.on('dragstart', this.handleDragStart);
        this.svg.on('dragend', this.handleDragEnd);
    }

    calculateDistanceInMeters = points => {
        const distanceInPixels = lengthBetweenTwoPoints(...points);
        const distanceInMeters = pixelsToMeters(distanceInPixels, this.options.scale);
        return toFixed(distanceInMeters, 3)
    }

    calculateAngle = points => {
        const [x1, y1, x2, y2] = points;
        return toFixed(getAngleFromPoint({ x: x2, y: y2 }, { x: x1, y: y1 }));
    }

    updateDistanceText = (contentText = '', points = [0, 0, 0, 0]) => {
        const [, , x2, y2] = points;
        const angle = this.calculateAngle(points);
        this.text.text(contentText).move(x2, y2)
            .node.setAttribute('transform', 'rotate(' + angle + ' ' + x2 + ' ' + y2 + ')');

        if (angle > 90 && angle < 270) {
            this.text.scale(-1, -1);
        }
    }

    clean = () => {
        this.svg.remove();
    }

    done = () => {
        document.removeEventListener(...this.keydownEventListener);
        document.removeEventListener(...this.keyupEventListener);

        store.dispatch(toggleMeasureTool(false));
    }
}

export function handleMeasure(isMeasureMode) {
    //console.log('handleMeasure isMeasureMode', isMeasureMode);

    if (!isMeasureMode) {
        workplaceRepository.list().forEach(o => o.enableDrag());
        return;
    }

    new MeasureTool({ scale: getProductionHall(store.getState()).svgScale });
    workplaceRepository.list().forEach(o => o.disableDrag());
}