import SVG from 'svg.js'
import { drawSvg } from './util/draw'

class Stage {
    constructor() {
        this.svg = drawSvg.rect('90%', 350)
            .fill('none')
            .stroke({ color: 'grey', width: 2 });

        this.workplaces = [];
    }

    findOtherWorkplaces(wp) {
        return this.workplaces.filter(o => o.id !== wp.id);
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
}

SVG.on(document, 'DOMContentLoaded', () => stage = new Stage());

export let stage;