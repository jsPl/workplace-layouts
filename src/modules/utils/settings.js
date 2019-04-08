import { store } from '../../redux/configureStore';
import { changeSvgWorkplacePictureVisibility, changeSvgWorkplaceStateVisibility } from '../../redux/ui';

const storage_cp_active_items = 'control_panel_active_items';
const storage_svg_workplace_image_visible = 'storage_svg_workplace_image_visible';
const storage_svg_workplace_state_visible = 'storage_svg_workplace_state_visible';
const storage_cp_hint_measure_tool_visible = 'storage_cp_hint_measure_tool_visible';
const storage_cp_hint_multiple_selection_visible = 'storage_cp_hint_multiple_selection_visible';

export const settings = {

    setControlPanelCollapseItems(activeItems) {
        localStorage.setItem(storage_cp_active_items, JSON.stringify(activeItems))
    },

    getControlPanelCollapseItems() {
        return JSON.parse(localStorage.getItem(storage_cp_active_items) || '["1", "2", "3", "4", "5"]')
    },

    setSvgWorkplaceImageVisible(visible) {
        localStorage.setItem(storage_svg_workplace_image_visible, visible)
    },

    getSvgWorkplaceImageVisible() {
        const result = localStorage.getItem(storage_svg_workplace_image_visible) || 'true';
        // eslint-disable-next-line
        return result == 'true';
    },

    setSvgWorkplaceStateVisible(visible) {
        localStorage.setItem(storage_svg_workplace_state_visible, visible)
    },

    getSvgWorkplaceStateVisible() {
        const result = localStorage.getItem(storage_svg_workplace_state_visible) || 'true';
        // eslint-disable-next-line
        return result == 'true';
    },

    setHintMeasureToolVisible(visible) {
        localStorage.setItem(storage_cp_hint_measure_tool_visible, visible)
    },

    getHintMeasureToolVisible() {
        const result = localStorage.getItem(storage_cp_hint_measure_tool_visible) || 'true';
        // eslint-disable-next-line
        return result == 'true';
    },

    setHintMultipleSelectionVisible(visible) {
        localStorage.setItem(storage_cp_hint_multiple_selection_visible, visible)
    },

    getHintMultipleSelectionVisible() {
        const result = localStorage.getItem(storage_cp_hint_multiple_selection_visible) || 'true';
        // eslint-disable-next-line
        return result == 'true';
    },

    restoreDefaults(callback) {
        store.dispatch(changeSvgWorkplacePictureVisibility(true));
        store.dispatch(changeSvgWorkplaceStateVisibility(true));
        this.clear();

        callback && callback();
    },

    hasItems() {
        return localStorage.length > 0;
    },

    clear() {
        [
            storage_cp_active_items,
            storage_svg_workplace_image_visible,
            storage_cp_hint_measure_tool_visible,
            storage_cp_hint_multiple_selection_visible
        ].forEach(key => localStorage.removeItem(key));
    }
}