import SVG from 'svg.js';
import { store } from '../reducers';
import * as actions from '../actions';

class Selection {
    constructor() {
        this.selectables = [];
    }

    get current() {
        return this._currentEl;
    }

    set current(selectedEl) {
        if (this._currentEl) {
            this._currentEl.classList.remove('selected');
        }

        if (selectedEl) {
            selectedEl.classList.add('selected');
            //console.log('selected', this.svgElementToJavascriptClassInstance(selectedObject).constructor.name);
        }

        this._currentEl = selectedEl;
        let selectedObj = this.svgElementToJavascriptClassInstance(selectedEl);
        store.dispatch(actions.selectWorkplace(selectedObj ? selectedObj.id : null));
    }

    addSelectable = (obj) => {
        obj.svg.addClass('selectable');
        this.selectables.push(obj);
        return this;
    }

    svgElementToJavascriptClassInstance = (svgEl) => {
        if (!svgEl) return null;
        return this.selectables.find(o => o.svg.id() === svgEl.id);
    }
}

SVG.on(document, 'DOMContentLoaded', () => {
    selection = new Selection();

    SVG.on(window, 'mousedown', (evt) => {
        const isLeftClick = evt.button === 0;

        if (isLeftClick) {
            const isSvgClick = evt.target.closest('svg.drawSvg') != null;

            if (isSvgClick) {
                if (evt.target && evt.target.classList.contains('selectable')) {
                    if (selection.current !== evt.target) {
                        selection.current = evt.target;
                    }
                }
                else {
                    selection.current = null;
                }
            }
        }
    });
});

export let selection;