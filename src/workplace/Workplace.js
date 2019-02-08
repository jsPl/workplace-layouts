import { drawSvg } from '../util/draw'
import 'svg.draggy.js'
import { generateRandomString } from '../util/utils'
import { selection } from '../util/selection'
import throttle from 'lodash/throttle'
import { updateWorkplace, removeWorkplace } from '../actions'
import { store } from '../configureStore'
import { workplaceRepository } from './workplaceRepository'
import difference from 'lodash/difference';

export default class Workplace {
    constructor(options) {
        this.id = generateRandomString();
        Object.assign(this, options);

        this.handleDetectCollisionThrottled = throttle(this.handleDetectCollision, 100);
    }

    handleDragStart() {
        //console.log('startdrag');
        this.svg.front();
        this.startX = this.svg.x();
        this.startY = this.svg.y();
    }

    handleDragMove() {
        //console.log('drag');
        this.handleDetectCollisionThrottled();
    }

    handleDragEnd() {
        //console.log('dragend');
        if (this.isColliding) {
            this.svg.move(this.startX, this.startY);
            this.svg.removeClass('colliding');
        }

        if (this.hasMoved()) {
            store.dispatch(updateWorkplace({ id: this.id, x: this.svg.x(), y: this.svg.y() }));
        }
    }

    handleDelete() {
        store.dispatch(removeWorkplace(this.id));
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

    hasMoved() {
        return this.startX !== this.svg.x() || this.startY !== this.svg.y();
    }

    render = () => {
        this.svg = drawSvg.rect(this.width, this.height)
            .move(this.x, this.y)
            .toPath(true)
            .fill(this.color)
            .stroke({ color: this.color, width: 2 })
            .draggy();

        this.svg.on('dragstart', evt => this.handleDragStart(evt));
        this.svg.on('dragmove', evt => this.handleDragMove(evt));
        this.svg.on('dragend', evt => this.handleDragEnd(evt));

        selection.addSelectable(this);
        return this;
    }

    setter = (changes) => {
        Object.assign(this, changes);
        return this
    }
}

export const handleWorkplacesStateChange = (current, prev = []) => {
    const prevIds = prev.map(o => o.id);
    const currentIds = current.map(o => o.id);
    console.log('handleWorkplacesStateChange from ', prevIds, ' to ', currentIds);
    const deleted = difference(prevIds, currentIds);
    const added = difference(currentIds, prevIds);

    console.log('deleted', deleted);
    console.log('added', added);

    added.forEach(id => {
        let workplaceData = current.find(o => o.id === id);
        //console.log('new Workplace', new Workplace(workplaceData));
        workplaceRepository.add(new Workplace(workplaceData).render());
    });

    deleted.forEach(id => {
        workplaceRepository.findById(id).svg.remove();
        workplaceRepository.remove({ id });
    });

    console.log('workplaceRepository list', workplaceRepository.list());
}

export const handleWorkplaceSelectionStateChange = (toId) => {
    //console.log('handleWorkplaceSelectionStateChange', fromId, toId)
    let selectedWorkplaceObj = workplaceRepository.findById(toId);
    if (selectedWorkplaceObj) {
        selection.current = selectedWorkplaceObj.svg.node;
    }
}