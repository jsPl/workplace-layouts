import SVG from 'svg.js';
import svgPanZoom from 'svg-pan-zoom';
import { selection } from './selection';
import debounce from 'lodash/debounce';

const configurePanZoom = gridPattern => ({
    minZoom: 0.3,
    maxZoom: 2,
    fit: false,
    center: false,
    panEnabled: true,
    controlIconsEnabled: true,
    zoomScaleSensitivity: 0.3,
    onUpdatedCTM: newCTM => {
        gridPattern.transform(newCTM);
    },
    beforePan: () => {
        let blockPan = selection.current != null || selection.lastClicked.classList.contains('productionHall');
        return !blockPan;
    }
})

export function initPanZoom(svgContainer, gridPattern) {
    const panZoom = svgPanZoom(svgContainer.node, configurePanZoom(gridPattern));
    window.addEventListener('resize', debounce(() => panZoom.resize(), 100));

    return panZoom;
}

export const getPanZoomSvgEl = () => SVG.select('g.svg-pan-zoom_viewport').first();