import { drawSvg, GRID_SIZE, panZoom } from '../util/draw';
import 'svg.draw.js';
import { store } from '../configureStore';
import { toggleMeasureTool } from '../actions';
import { getProductionHall } from '../selectors';
import { getPanZoomSvgEl } from '../util/panZoom';
import { toFixed } from '../util/conversion';
import { lengthBetweenTwoPoints } from 'svg.intersections.js';
import { pixelsToMeters, getAngleFromPoint } from './conversion';
import isEqual from 'lodash/isEqual';
import '../assets/lineable';
import { selection } from '../util/selection';
import { workplaceRepository } from '../workplace/workplaceRepository';

class MeasureTool {
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
        selection.addSelectable(group, this);

        //console.log('MeasureTool', this.drawing, this.drawing.draw.foo, this.drawing.foo)

        this.svg = group;
        return this;
    }

    handleKeydown = evt => {
        console.log('measure handleKeydown', evt.key);

        if (evt.key === 'Escape') {
            this.drawing.draw('cancel');
        }
        if (evt.key === 'Control') {
            if (this.shouldChangeSnap()) {
                this.drawing.draw('param', 'snapToGrid', GRID_SIZE);
            }
        }

        if (evt.keyCode >= 37 && evt.keyCode <= 40) {
            const panBy = { x: 0, y: 0 };
            switch (evt.key) {
                case 'ArrowDown':
                    panBy.y = -50;
                    break;
                case 'ArrowUp':
                    panBy.y = 50;
                    break;
                case 'ArrowLeft':
                    panBy.x = 50;
                    break;
                case 'ArrowRight':
                    panBy.x = -50;
                    break;
                default: break;
            }
            panZoom.panBy(panBy)
        }

    }

    handleKeyup = evt => {
        if (this.shouldChangeSnap()) {
            this.drawing.draw('param', 'snapToGrid', 1);
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

            this.svg.parent().element('title').words('Drag to move or click and press Delete to remove')
        });

        this.drawing.on('drawupdate', ({ detail }) => {
            //console.log('drawupdate', detail.p)

            const points = this.drawing.array().valueOf().flat();
            const distanceInMeters = this.calculateDistanceInMeters(points);
            this.updateDistanceText(distanceInMeters + ' m', points);
        })
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
