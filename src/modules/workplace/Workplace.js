import { drawSvg, SvgClassname } from '../utils/draw';
import { getPanZoomSvgEl } from '../utils/panZoom';
import 'svg.draggy.js';
import { toFixed } from '../utils/conversion';
import { selection } from '../utils/selection';
import throttle from 'lodash/throttle';
import { updateWorkplace } from '../../redux/workplace';
import { isSvgWorkplacePictureVisible, isSvgWorkplaceStateVisible, blockPanning } from '../../redux/ui';
import { store } from '../../redux/configureStore';
import { workplaceRepository } from './workplaceRepository';
import difference from 'lodash/difference';

export default class Workplace {
    constructor(options) {
        Object.assign(this, options);

        this.handleDetectCollisionThrottled = throttle(this.handleDetectCollision, 100);
        this._isDragEnabled = false;
    }

    handleDragStart = evt => {
        //console.log('workplace start drag', evt.type);
        evt.type !== 'keydown' && store.dispatch(blockPanning(true));
        this.svg.front();
        this.startX = this.svg.x();
        this.startY = this.svg.y();
    }

    handleDragMove = () => {
        //console.log('workplace drag');
        this.handleDetectCollisionThrottled();
    }

    handleDragEnd = evt => {
        //console.log('dragend', evt.type);
        evt.type !== 'keydown' && store.dispatch(blockPanning(false));

        if (this.isColliding) {
            this.svg.move(this.startX, this.startY);
            this.svg.removeClass('colliding');
        }

        if (this.hasMoved()) {
            let x = toFixed(this.svg.x());
            let y = toFixed(this.svg.y());
            store.dispatch(updateWorkplace({ id: this.id, x, y }));
        }
    }

    handleDetectCollision() {
        let collisions = workplaceRepository.findCollisionsWith(this);

        let isColliding = collisions.length > 0;
        this.isColliding = isColliding;
        if (isColliding) {
            this.svg.addClass('colliding');
        } else {
            this.svg.removeClass('colliding');
            //this.startX = this.svg.x();
            //this.startY = this.svg.y();
        }

        //console.log('isColliding', isColliding, 'collisions', collisions);
    }

    handleSelection = evt => {
        //console.log('handle selection', this);
        this.svg.front();
    }

    hasMoved() {
        return this.startX !== this.svg.x() || this.startY !== this.svg.y();
    }

    getSvgForCollisionCalculation() {
        return this.rectBbox;
    }

    drawSvg = () => {
        let group = drawSvg.group();

        this.rectBbox = group.rect(this.width, this.height)
            .toPath(true)
            .addClass('workplaceBBox')

        this.drawState(group);
        this.drawPicture(group);
        this.drawTitle(group);

        group.on('dragstart', this.handleDragStart);
        group.on('dragmove', this.handleDragMove);
        group.on('dragend', this.handleDragEnd);

        selection.addSelectable(group, this.handleSelection);

        group.move(this.x, this.y).data('workplace-id', this.id);

        group.addTo(getPanZoomSvgEl());
        this.svg = group;
        this.enableDrag();

        SvgClassname.set(this.svg, 'Workplace');

        return this;
    }

    drawState(group) {
        if (this.state && this.state.code !== '') {
            const radius = 25, pad = 4, el = group.group();
            const stateEl = el.circle(radius).addClass('state').fill(this.state.code)
                .dmove(this.width - radius - pad, pad);
            const titleEl = drawSvg.element('title').words('State: ' + this.state.label);
            el.add(stateEl).add(titleEl);
            this.stateEl = stateEl;

            if (!isSvgWorkplaceStateVisible(store.getState())) {
                this.stateVisibility(false)
            }
        }
    }

    drawPicture(group) {
        if (this.imgPath) {
            const image = group.image(process.env.PUBLIC_URL + this.imgPath)
                .addClass('workplaceImage')
                .loaded(loader => {
                    image.size(loader.width * 0.35);
                    if (!isSvgWorkplacePictureVisible(store.getState())) {
                        this.pictureVisibility(false)
                    }
                })
                .dmove(5, 5);
            this.picture = image;
        }
    }

    drawTitle(group) {
        if (this.title) {
            group.plain(this.title).font('family', '').addClass('workplaceTitle').dmove(5, this.height - 10);
        }
    }

    enableDrag() {
        this.svg.draggy();
        this._isDragEnabled = true;
        return this;
    }

    disableDrag() {
        this.svg.fixed();
        this._isDragEnabled = false;
        return this;
    }

    isDragEnabled() {
        return this._isDragEnabled;
    }

    pictureVisibility(visible) {
        this.picture && (visible ? this.picture.show() : this.picture.hide());
        return this;
    }

    stateVisibility(visible) {
        this.stateEl && (visible ? this.stateEl.show() : this.stateEl.hide());
        return this;
    }
}

export const handleWorkplacesStateChange = (current, prev = []) => {
    const prevIds = prev.map(o => o.id);
    const currentIds = current.map(o => o.id);
    const deleted = difference(prevIds, currentIds);
    const added = difference(currentIds, prevIds);

    // console.log('deleted', deleted);
    // console.log('added', added);

    added.forEach(id => {
        let workplaceData = current.find(o => o.id === id);
        workplaceRepository.add(new Workplace(workplaceData).drawSvg());
    });

    deleted.forEach(id => {
        workplaceRepository.findById(id).svg.remove();
        workplaceRepository.remove({ id });
    });

    //console.log('workplaceRepository list', workplaceRepository.list());
}

export const handleWorkplaceSelectionStateChange = (toIds, fromIds) => {
    //console.log('handleWorkplaceSelectionStateChange from ', fromIds, 'to', toIds)
    selection.current = workplaceRepository.findByIds(toIds).map(o => o.svg.node);
}

export const handleWorkplacePictureVisibilityChange = visible => {
    workplaceRepository.list().forEach(o => o.pictureVisibility(visible))
}

export const handleWorkplaceStateVisibilityChange = visible => {
    workplaceRepository.list().forEach(o => o.stateVisibility(visible))
}