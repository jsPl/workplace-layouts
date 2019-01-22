import SVG from 'svg.js'
import { drawSvg } from './util/draw'
import { isPathColliding } from './util/collisions'
import { generateRandomString } from './util/utils'
import Workplace from './workplace/Workplace';

let state = {
    color: '#faebd7',
    width: 1000,
    height: 350,
    workplaces: [
        { title: 'wp1', color: '#e5c8e7', width: 200, height: 100, y: 200 },
        { title: 'wp2', color: '#309EFF' },
        { title: 'wp3', color: '#FFCF60', x: 300 },
        { title: 'wp4', color: '#46ccac', x: 500 }
    ]
}

class ProductionHall {
    constructor(options) {
        this.id = generateRandomString();
        Object.assign(this, options);

        this.workplaces = this.workplaces.map(o => new Workplace(o));
    }

    addWorkplace(...workplaces) {
        let existing = this.workplaces.map(o => o.id);
        workplaces.forEach(workplace => {
            if (!existing.includes(workplace.id)) {
                this.workplaces.push(workplace);
            }
        })
        return this;
    }

    removeWorkplace(workplace) {
        this.workplaces = this.workplaces.filter(o => o.id !== workplace.id);
        workplace.svg.remove();
        return this;
    }

    findWorkplacesOtherThan(workplace) {
        return this.workplaces.filter(o => o.id !== workplace.id);
    }

    findCollisionsWith(obj) {
        let collidingObjects = [this, ...this.findWorkplacesOtherThan(obj)] //this.findWorkplacesOtherThan(obj)
            .filter(o => isPathColliding(o.svg, obj.svg));
        return collidingObjects;
    }

    get minMaxBounds() {
        let bbox = this.svg.bbox();
        return {
            minX: bbox.x,
            minY: bbox.y,
            maxX: bbox.w,
            maxY: bbox.h
        }
    }

    render = () => {
        this.svg = drawSvg.rect(this.width, this.height).toPath(true)
            .fill(this.color)
            .back();

        this.workplaces.forEach(wp => wp.render());
    }
}

SVG.on(document, 'DOMContentLoaded', () => productionHall = new ProductionHall(state));

export let productionHall;