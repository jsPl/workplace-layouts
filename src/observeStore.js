import { store } from './configureStore';
import { handleProductionHallStateChange } from './production_hall/ProductionHall';
import { handleWorkplacesStateChange, handleWorkplaceSelectionStateChange } from './workplace/Workplace';
import { handleProductionHallDrawing } from './production_hall/draw';
import { getProductionHall, getSelectedWorkplaceId, getWorkplaces, isDrawingMode } from './selectors';

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
    observeStore(getSelectedWorkplaceId, handleWorkplaceSelectionStateChange);
    observeStore(getWorkplaces, handleWorkplacesStateChange);
    observeStore(isDrawingMode, handleProductionHallDrawing);
});