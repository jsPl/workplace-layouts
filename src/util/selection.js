import SVG from 'svg.js';
import { store } from '../redux/configureStore';
import { isMeasureToolMode } from '../redux/ui';
import { getSelectedWorkplacesId, selectWorkplace } from '../redux/workplace';
import { selectProcess } from '../redux/process';
import { ensureElementIsInView } from '../util/utils';
import { workplaceRepository } from '../workplace/workplaceRepository';
import isEqual from 'lodash/isEqual';
import difference from 'lodash/difference';
import { parseIdsFromDataset } from './utils';

class Selection {
    constructor() {
        this._lastClickedEl = null;
        this._currentEl = [];
        this.multiple = false;
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

    set current(selected) {
        //console.log('sel current', selectedEl, this._currentEl)
        if (isEqual(selected, this._currentEl)) {
            return;
        }

        const toUnselect = difference(this._currentEl, selected);
        const toSelect = difference(selected, this._currentEl);

        // console.log('toUnselect', toUnselect)
        // console.log('toSelect', toSelect)

        processElementsToUnselect(toUnselect);
        processElementsToSelect(toSelect);
        const toDispatch = processWorkplacesSelection(this._currentEl, selected);

        this._currentEl = selected;

        if (toDispatch) {
            //console.log('dispatch action ', JSON.stringify(toDispatch));
            toDispatch.forEach(action => store.dispatch(action));
        }
    }

    currentWorkplaceIds = () => parseIdsFromDataset(this._currentEl, 'workplaceId');

    addSelectable = (svgEl, handleSelection = () => { }, handleUnselection = () => { }) => {
        svgEl.addClass('selectable')
            .on('selection.layouts', handleSelection)
            .on('unselection.layouts', handleUnselection);
        return this;
    }

    isEmpty = () => this._currentEl.length === 0;
    clear = () => this.current = [];
}

SVG.on(document, 'DOMContentLoaded', () => {
    selection = new Selection();

    SVG.on(window, 'mousedown', evt => {
        const isLeftClick = evt.button === 0;
        const isSvgClick = evt.target && evt.target.closest('svg.drawSvg') != null;
        const isMultipleSelection = evt.ctrlKey;

        if (isLeftClick && isSvgClick) {
            let selectableEl = evt.target.closest('.selectable');
            selection.lastClicked = evt.target;

            //console.log('click on', evt.target, selectableEl);

            if (!isMeasureToolMode(store.getState())) {
                if (!selectableEl) {
                    //selection.current = []
                }
                else if (isMultipleSelection) {
                    const inSelection = workplaceRepository
                        .findByIds(getSelectedWorkplacesId(store.getState()))
                        .map(o => o.svg.node);

                    const toAdd = inSelection.includes(selectableEl) ?
                        inSelection.filter(o => o !== selectableEl)
                        :
                        [...inSelection, selectableEl];

                    selection.current = toAdd;
                }
                else {
                    selection.current = [selectableEl];
                }
            }
        }
    });
});

const processElementsToSelect = toSelect => {
    toSelect.forEach(o => {
        o.classList.add('selected');
        const svgObj = SVG.get(o.id);
        svgObj && svgObj.fire('selection');
    })
}

const processElementsToUnselect = toUnselect => {
    toUnselect.forEach(o => {
        o.classList.remove('selected')
        const svgObj = SVG.get(o.id);
        svgObj && svgObj.fire('unselection');
    })
}

const processWorkplacesSelection = (currentSelectionElements, newSelectionElements) => {
    const prevIds = parseIdsFromDataset(currentSelectionElements, 'workplaceId');
    const nextIds = parseIdsFromDataset(newSelectionElements, 'workplaceId');

    if (nextIds.length === 1) {
        ensureElementIsInView(
            document.querySelector('.panelWorkplaces .list'),
            document.querySelector(`.panelWorkplaces .list [data-id="${nextIds[0]}"]`)
        );
    }

    return isEqual(prevIds.sort(), nextIds.sort()) ?
        null
        :
        [selectWorkplace({ ids: nextIds, activeTab: 'workplaces' }), selectProcess({ ids: [] })];
}

export let selection;