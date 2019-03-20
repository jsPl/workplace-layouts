import SVG from 'svg.js';
import svgPanZoom from 'svg-pan-zoom';
import { selection } from './selection';
import debounce from 'lodash/debounce';
import { isMeasureToolMode } from '../selectors';
import { store } from '../configureStore';

const configurePanZoom = gridPattern => ({
    minZoom: 0.1,
    maxZoom: 6,
    fit: false,
    center: false,
    panEnabled: true,
    controlIconsEnabled: true,
    zoomScaleSensitivity: 0.35,
    onUpdatedCTM: newCTM => {
        gridPattern.transform(newCTM);
    },
    // beforeZoom: () => {
    //     //return !isZoomBlocked();
    // },
    beforePan: () => {
        return !isPanBlocked();
    }
})

export function initPanZoom(svgContainer, gridPattern) {
    const panZoom = svgPanZoom(svgContainer.node, configurePanZoom(gridPattern));
    window.addEventListener('resize', debounce(() => panZoom.resize(), 100));

    return panZoom;
}

export const getPanZoomSvgEl = () => SVG.select('g.svg-pan-zoom_viewport').first();

const isPanBlocked = () => {
    let isBlocked = !selection.isEmpty() && !isMeasureToolMode(store.getState())
    //||
    //(selection.lastClicked && selection.lastClicked.classList.contains('productionHall')) ||
    //;
    return isBlocked;
}

// const isZoomBlocked = () => {
//     return isMeasureToolMode(store.getState());
// }