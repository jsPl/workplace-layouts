import { store } from './configureStore';
import { handleProductionHallStateChange } from './production_hall/ProductionHall'
import { handleWorkplacesStateChange, handleWorkplaceSelectionStateChange } from './workplace/Workplace'
import { handleProductionHallDrawing } from './production_hall/draw'

/**
 * https://github.com/reduxjs/redux/issues/303#issuecomment-125184409
 * @param {Object} store
 * @param {Function} select
 * @param {Function} onChange
 */
export function observeStore(select, onChange) {
    let currentState;
    function handleChange() {
        let nextState = select(store.getState());
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
    observeStore(state => state.productionHall, (current, prev) => handleProductionHallStateChange(current, prev));
    observeStore(state => state.appUi.selectedWorkplace, (current, prev) => handleWorkplaceSelectionStateChange(current, prev));
    observeStore(state => state.workplaces, (current, prev) => handleWorkplacesStateChange(current, prev));
    observeStore(state => state.appUi.isDrawingMode, isDrawingMode => handleProductionHallDrawing(isDrawingMode));
});