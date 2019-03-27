import * as types from './actionTypes';
import { settings } from './util/settings';

// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// Action creator naming convention: <verb><Noun>
export const addWorkplace = data => ({ type: types.WORKPLACE_ADD, data })
export const updateWorkplace = ({ id, ...data }) => ({ type: types.WORKPLACE_UPDATE, id, data })
export const removeWorkplace = id => ({ type: types.WORKPLACE_REMOVE, id })
export const selectWorkplace = ids => ({ type: types.WORKPLACE_SELECT, ids })

export const fetchWorkplace = id => ({ type: types.WORKPLACE_FETCH, id })
export const fetchWorkplaceSuccess = data => ({ type: types.WORKPLACE_FETCH_SUCCESS, data })
export const fetchWorkplaceFailure = error => ({ type: types.WORKPLACE_FETCH_FAILURE, error })

export const updateProductionHall = data => ({ type: types.PRODUCTION_HALL_UPDATE, data })
export const clearProductionHallLayout = () => ({ type: types.PRODUCTION_HALL_LAYOUT_CLEAR })

export const fetchHallWithWorkplaces = () => ({ type: types.PRODUCTION_HALL_WITH_WORKPLACES_FETCH })
export const sendHallWithWorkplaces = () => ({ type: types.PRODUCTION_HALL_WITH_WORKPLACES_SEND });
export const sendHallWithWorkplacesSuccess = data => ({
    type: types.PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS, data,
    success: { type: 'success', message: 'Success' }
});
export const sendHallWithWorkplacesFailure = error => ({ type: types.PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE, error });

export const toggleMeasureTool = isMeasureMode => ({ type: types.TOOLS_MEASURE_TOGGLE, isMeasureMode })
export const setSelectedItemsActiveTab = selectedItemsActiveTab => ({ type: types.UI_SELECTED_ITEMS_ACTIVE_TAB_CHANGE, selectedItemsActiveTab })

export const changeSvgWorkplacePictureVisibility = visible => {
    settings.setSvgWorkplaceImageVisible(visible);
    return { type: types.SVG_WORKPLACE_PICTURE_VISIBILITY_CHANGE, visible }
};

export const addProcess = data => ({ type: types.PROCESS_ADD, data })
export const selectProcess = ids => ({ type: types.PROCESS_SELECT, ids })

export const addOperation = data => ({ type: types.OPERATION_ADD, data })
export const removeOperation = id => ({ type: types.OPERATION_REMOVE, id })
export const removeAllOperations = () => ({ type: types.OPERATION_REMOVE_ALL })
export const fetchOperations = process_id => ({ type: types.OPERATIONS_FETCH, process_id })
export const fetchOperationsSuccess = data => ({ type: types.OPERATIONS_FETCH_SUCCESS, data })
export const fetchOperationsFailure = error => ({ type: types.OPERATIONS_FETCH_FAILURE, error })