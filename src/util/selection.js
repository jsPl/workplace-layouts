import SVG from 'svg.js';
import { store } from '../configureStore';
import { selectWorkplace } from '../actions';

class Selection {
    // constructor() {
    //     //this.selectables = [];
    // }

    get current() {
        return this._currentEl;
    }

    set current(selectedEl) {
        if (selectedEl === this._currentEl) {
            return;
        }

        if (this._currentEl) {
            this._currentEl.classList.remove('selected');
        }

        if (selectedEl) {
            selectedEl.classList.add('selected');
        }

        this._currentEl = selectedEl;
        const id = this.parseId(selectedEl);

        if (store.getState().appUi.selectedWorkplace !== id) {
            store.dispatch(selectWorkplace(isNaN(id) ? null : id));
        }
    }

    currentId() {
        return this.parseId(this._currentEl);
    }

    parseId = (el) => {
        let id = el && parseInt(el.dataset.workplaceId);
        return isNaN(id) ? null : id;
    }

    addSelectable = (svgEl, obj) => {
        //this.selectables.push(obj);
        svgEl.addClass('selectable');
        return this;
    }

    // svgElementToJavascriptClassInstance = (svgEl) => {
    //     console.log('svgEl', svgEl, this.selectables)
    //     if (!svgEl) return null;
    //     return this.selectables.find(o => o.svg.id() === svgEl.id);
    // }
}

SVG.on(document, 'DOMContentLoaded', () => {
    selection = new Selection();

    SVG.on(window, 'mousedown', (evt) => {
        const isLeftClick = evt.button === 0;
        const isSvgClick = evt.target && evt.target.closest('svg.drawSvg') != null;

        if (isLeftClick && isSvgClick) {
            let selectableEl = evt.target.closest('.selectable');
            //console.log('click on', evt.target, selectableEl)
            if (selectableEl) {
                selection.current = selectableEl;
            }
            else {
                selection.current = null;
            }
        }
    });
});

export let selection;