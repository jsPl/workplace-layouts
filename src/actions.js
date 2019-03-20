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

export const changeSvgWorkplacePictureVisibility = visible => {
    settings.setSvgWorkplaceImageVisible(visible);
    return { type: types.SVG_WORKPLACE_PICTURE_VISIBILITY_CHANGE, visible }
};