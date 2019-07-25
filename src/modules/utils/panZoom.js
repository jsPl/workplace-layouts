import SVG from 'svg.js';
import svgPanZoom from 'svg-pan-zoom';
import './selection';
import debounce from 'lodash/debounce';
import { isPanningBlocked } from '../../redux/ui';
import { store } from '../../redux/configureStore';

const configurePanZoom = gridPattern => ({
    minZoom: 0.29, // przy mniejszych wartościach błędnie działa kalkulacja położenia w SwapTool
    maxZoom: 6,
    fit: false,
    center: false,
    panEnabled: true,
    controlIconsEnabled: true,
    zoomScaleSensitivity: 0.4,
    onUpdatedCTM: newCTM => {
        //console.log('onUpdatedCTM', newCTM);
        gridPattern.transform(newCTM);
    },
    //  beforeZoom: (oldScale, newScale) => {
    // //     //return !isZoomBlocked();
    //     console.log('beforeZoom from', oldScale, 'to', newScale)
    //  },
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
    //let isBlocked = !selection.isEmpty() && !isMeasureToolMode(store.getState())
    let isBlocked = isPanningBlocked(store.getState())
    //||
    //(selection.lastClicked && selection.lastClicked.classList.contains('productionHall')) ||
    //;
    return isBlocked;
}

// const isZoomBlocked = () => {
//     return isMeasureToolMode(store.getState());
// }