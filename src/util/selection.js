import SVG from 'svg.js';
import { store } from '../configureStore';
import { selectWorkplace } from '../actions';
import { getSelectedWorkplaceId } from '../selectors';
import { ensureElementIsInView } from '../util/utils';

class Selection {
    constructor() {
        this._lastClickedEl = null;
    }

    get lastClicked() {
        return this._lastClickedEl;
    }

    set lastClicked(el) {
        this._lastClickedEl = el;
    }

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

        if (getSelectedWorkplaceId(store.getState()) !== id) {
            store.dispatch(selectWorkplace(isNaN(id) ? null : id));

            ensureElementIsInView(document.querySelector('.wpList'), document.querySelector('.wpList .selected'));
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
            selection.lastClicked = evt.target;

            //console.log('click on', evt.target, selectableEl);
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