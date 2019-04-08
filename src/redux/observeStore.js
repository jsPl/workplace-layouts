import { store } from './configureStore';
import { handleProductionHallStateChange } from '../modules/ProductionHall';
import { handleWorkplacesStateChange, handleWorkplaceSelectionStateChange, 
    handleWorkplacePictureVisibilityChange, handleWorkplaceStateVisibilityChange } from '../modules/workplace/Workplace';
import { handleMeasure } from '../modules/MeasureTool';
import { getSelectedWorkplacesId, getWorkplaces } from './workplace';
import { getSelectedProcessesId } from './process';
import { getProductionHall } from './productionHall';
import { isMeasureToolMode, isSvgWorkplacePictureVisible, isSvgWorkplaceStateVisible } from './ui';
import { handleProcessSelectionStateChange } from '../modules/OperationFlow';

/**
 * https://github.com/reduxjs/redux/issues/303#issuecomment-125184409
 * @param {Object} store
 * @param {Function} selector
 * @param {Function} onChange
 */
export function observeStore(selector, onChange) {
    let currentState;
    function handleChange() {
        let nextState = selector(store.getState());
        if (nextState !== currentState) {
            onChange(nextState, currentState);
            currentState = nextState;
        }
    }
    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}

// Obserwowanie zmian stanu dla części SVG aplikacji
document.addEventListener('DOMContentLoaded', () => {
    observeStore(getProductionHall, handleProductionHallStateChange);
    observeStore(getSelectedWorkplacesId, handleWorkplaceSelectionStateChange);
    observeStore(getWorkplaces, handleWorkplacesStateChange);
    observeStore(isSvgWorkplacePictureVisible, handleWorkplacePictureVisibilityChange);
    observeStore(isSvgWorkplaceStateVisible, handleWorkplaceStateVisibilityChange);
    observeStore(isMeasureToolMode, handleMeasure);
    observeStore(getSelectedProcessesId, handleProcessSelectionStateChange);
});