import { batch } from 'react-redux';
import { settings } from '../modules/utils/settings';
import {
    PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE, PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS,
    PRODUCTION_HALL_WITH_WORKPLACES_FETCH_SUCCESS, PRODUCTION_HALL_WITH_WORKPLACES_FETCH_FAILURE
} from './workplace';
import { OPERATIONS_FETCH_FAILURE, OPERATIONS_FETCH_SUCCESS } from './operation';
import { selectWorkplace } from './workplace';
import { selectProcess } from './process';
import { CRAFT_CALCULATE_CURRENT_LAYOUT_COST_COMPLETE } from './craft';

const TOOLS_MEASURE_TOGGLE = 'TOOLS_MEASURE_TOGGLE';
const SVG_WORKPLACE_PICTURE_VISIBILITY_CHANGE = 'SVG_WORKPLACE_PICTURE_VISIBILITY_CHANGE';
const SVG_WORKPLACE_STATE_VISIBILITY_CHANGE = 'SVG_WORKPLACE_STATE_VISIBILITY_CHANGE';
const UI_SELECTED_ITEMS_ACTIVE_TAB_CHANGE = 'UI_SELECTED_ITEMS_ACTIVE_TAB_CHANGE';
const PANNING_BLOCK = 'PANNING_BLOCK';

const initialState = {
    isMeasureToolMode: false,
    message: null,
    isSvgWorkplacePictureVisible: settings.getSvgWorkplaceImageVisible(),
    isSvgWorkplaceStateVisible: settings.getSvgWorkplaceStateVisible(),
    selectedItemsActiveTab: 'workplaces',
    blockPanning: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOOLS_MEASURE_TOGGLE:
            return { ...state, isMeasureToolMode: !state.isMeasureToolMode }
        case SVG_WORKPLACE_PICTURE_VISIBILITY_CHANGE:
            return { ...state, isSvgWorkplacePictureVisible: action.visible }
        case SVG_WORKPLACE_STATE_VISIBILITY_CHANGE:
            return { ...state, isSvgWorkplaceStateVisible: action.visible }
        case UI_SELECTED_ITEMS_ACTIVE_TAB_CHANGE:
            return { ...state, selectedItemsActiveTab: action.selectedItemsActiveTab }
        case PANNING_BLOCK:
            return { ...state, blockPanning: action.block }

        case PRODUCTION_HALL_WITH_WORKPLACES_FETCH_FAILURE:
        case PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE:
        case OPERATIONS_FETCH_FAILURE:
            return { ...state, message: action.error }

        case PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS:
            return { ...state, message: action.success }
        case OPERATIONS_FETCH_SUCCESS:
        case PRODUCTION_HALL_WITH_WORKPLACES_FETCH_SUCCESS:
            return { ...state, message: null }

        case CRAFT_CALCULATE_CURRENT_LAYOUT_COST_COMPLETE:
            return { ...state, message: action.message }
        default:
            return state
    }
}

// Action creators
export const toggleMeasureTool = isMeasureMode => ({ type: TOOLS_MEASURE_TOGGLE, isMeasureMode })
export const setSelectedItemsActiveTab = selectedItemsActiveTab => ({ type: UI_SELECTED_ITEMS_ACTIVE_TAB_CHANGE, selectedItemsActiveTab })
export const changeSvgWorkplacePictureVisibility = visible => {
    settings.setSvgWorkplaceImageVisible(visible);
    return { type: SVG_WORKPLACE_PICTURE_VISIBILITY_CHANGE, visible }
}
export const changeSvgWorkplaceStateVisibility = visible => {
    settings.setSvgWorkplaceStateVisible(visible);
    return { type: SVG_WORKPLACE_STATE_VISIBILITY_CHANGE, visible }
}
export const blockPanning = block => ({ type: PANNING_BLOCK, block })
export const boundClearCurrentSelection = dispatch => batch(() => {
    dispatch(selectWorkplace({ ids: [] }));
    dispatch(selectProcess({ ids: [] }));
})

// Selectors
export const getMessage = state => state.ui.message;
export const isMeasureToolMode = state => state.ui.isMeasureToolMode;
export const isSvgWorkplacePictureVisible = ({ ui }) => ui.isSvgWorkplacePictureVisible;
export const isSvgWorkplaceStateVisible = ({ ui }) => ui.isSvgWorkplaceStateVisible;
export const getSelectedItemsActiveTab = state => state.ui.selectedItemsActiveTab;
export const isPanningBlocked = ({ ui }) => ui.blockPanning;