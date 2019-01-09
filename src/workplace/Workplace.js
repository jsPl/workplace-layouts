import { drawSvg } from '../util/draw'
import { isPathColliding } from '../util/collisions'
import 'svg.draggy.js'
import { generateRandomString } from '../util/utils'
import { stage } from '../Stage'

const defaults = {
    title: 'untitled workplace', 
    color: '#FFCF60',
    width: 100,
    height: 100
}

export default class Workplace {

    constructor(options) {
        Object.assign(this, defaults, options);

        this.id = generateRandomString();
        this.svg = drawSvg.rect(this.width, this.height).toPath(true)
            .fill(this.color)
            .stroke({ color: this.color, width: 2 })
            .draggy();

        this.svg.on("dragstart", evt => this.handleDragStart(evt));
        this.svg.on("dragmove", evt => this.handleDragMove(evt));
        this.svg.on("dragend", evt => this.handleDragEnd(evt));
    }

    handleDragStart() {
        console.log('startdrag');
        this.startX = this.svg.x();
        this.startY = this.svg.y();
    }

    handleDragMove({ detail }) {
        //console.log('drag', detail.delta);
        let collidingWorkplaces = stage.findOtherWorkplaces(this)
            .filter(otherWorplace => isPathColliding(this.svg, otherWorplace.svg));

        let isColliding = collidingWorkplaces.length > 0;
        this.isColliding = isColliding;
        if (isColliding) this.svg.addClass('colliding'); else this.svg.removeClass('colliding'); 

        console.log('isColliding', isColliding, 'collidingWorkplaces', collidingWorkplaces);
    }

    handleDragEnd() {
        console.log('dragend', 'isColliding', this.isColliding);
        if (this.isColliding) {
            this.svg.move(this.startX, this.startY);
            this.svg.removeClass('colliding');
        }
    }

    setter = (changes) => {
        Object.assign(this, changes);
        return this
    }
}