const storage_cp_active_items = 'control_panel_active_items';
const storage_svg_workplace_image_visible = 'storage_svg_workplace_image_visible';

export const settings = {

    setControlPanelCollapseItems(activeItems) {
        localStorage.setItem(storage_cp_active_items, JSON.stringify(activeItems))
    },

    getControlPanelCollapseItems() {
        return JSON.parse(localStorage.getItem(storage_cp_active_items) || '["1", "2", "3", "4"]')
    },

    setSvgWorkplaceImageVisible(visible) {
        localStorage.setItem(storage_svg_workplace_image_visible, visible)
    },

    getSvgWorkplaceImageVisible() {
        const result = localStorage.getItem(storage_svg_workplace_image_visible) || 'true';
        // eslint-disable-next-line
        return result == 'true';
    }
}