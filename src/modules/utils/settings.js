import { store } from '../../redux/configureStore';
import { batch } from 'react-redux';
import { changeSvgWorkplacePictureVisibility, changeSvgWorkplaceStateVisibility } from '../../redux/ui';
import { CRAFT_SPEED_OPTIONS } from '../../components/settings/CraftSpeed';

const storage_panel_active_items = 'collapse_active_items';
const storage_svg_workplace_image_visible = 'svg_workplace_image_visible';
const storage_svg_workplace_state_visible = 'svg_workplace_state_visible';
const storage_hint_measure_tool_visible = 'hint_measure_tool_visible';
const storage_hint_multiple_selection_visible = 'hint_multiple_selection_visible';
const storage_craft_speed = 'craft_speed';

export const settings = {

    setControlPanelCollapseItems(activeItems) {
        localStorage.setItem(storage_panel_active_items, JSON.stringify(activeItems))
    },

    getControlPanelCollapseItems() {
        return JSON.parse(localStorage.getItem(storage_panel_active_items) || '["hall", "tools", "workplaces", "apis", "processes"]')
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
        localStorage.setItem(storage_hint_measure_tool_visible, visible)
    },

    getHintMeasureToolVisible() {
        const result = localStorage.getItem(storage_hint_measure_tool_visible) || 'true';
        // eslint-disable-next-line
        return result == 'true';
    },

    setHintMultipleSelectionVisible(visible) {
        localStorage.setItem(storage_hint_multiple_selection_visible, visible)
    },

    getHintMultipleSelectionVisible() {
        const result = localStorage.getItem(storage_hint_multiple_selection_visible) || 'true';
        // eslint-disable-next-line
        return result == 'true';
    },

    setCraftSpeed(value) {
        localStorage.setItem(storage_craft_speed, value)
    },

    getCraftSpeed() {
        return localStorage.getItem(storage_craft_speed) || 'moderate';
    },

    getCraftSpeedSettings() {
        return CRAFT_SPEED_OPTIONS.find(o => o.value === this.getCraftSpeed());
    },

    restoreDefaults(callback = () => { }) {
        batch(() => {
            store.dispatch(changeSvgWorkplacePictureVisibility(true));
            store.dispatch(changeSvgWorkplaceStateVisibility(true));
        })
        this.clear();

        callback();
    },

    hasItems() {
        return localStorage.length > 0;
    },

    clear() {
        [
            storage_panel_active_items,
            storage_svg_workplace_image_visible,
            storage_svg_workplace_state_visible,
            storage_hint_measure_tool_visible,
            storage_hint_multiple_selection_visible,
            storage_craft_speed,
        ].forEach(key => localStorage.removeItem(key));
    }
}