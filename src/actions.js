import * as types from './actionTypes';

// Action creator naming convention: <verb><Noun>
export const addWorkplace = data => ({ type: types.WORKPLACE_ADD, data })
export const updateWorkplace = ({ id, ...data }) => ({ type: types.WORKPLACE_UPDATE, id, data })
export const removeWorkplace = id => ({ type: types.WORKPLACE_REMOVE, id })
export const selectWorkplace = id => ({ type: types.WORKPLACE_SELECT, id })

export const fetchWorkplace = id => ({ type: types.WORKPLACE_FETCH, id })
export const fetchWorkplaceSuccess = data => ({ type: types.WORKPLACE_FETCH_SUCCESS, data })
export const fetchWorkplaceFailure = error => ({ type: types.WORKPLACE_FETCH_FAILURE, error })

export const toggleDrawingMode = isDrawingMode => ({ type: types.PRODUCTION_HALL_TOGGLE_DRAWING_MODE, isDrawingMode })
export const updateProductionHall = data => ({ type: types.PRODUCTION_HALL_UPDATE, data })

export const fetchHallWithWorkplaces = () => ({ type: types.PRODUCTION_HALL_WITH_WORKPLACES_FETCH })
export const sendHallWithWorkplaces = () => ({ type: types.PRODUCTION_HALL_WITH_WORKPLACES_SEND });
export const sendHallWithWorkplacesSuccess = data => ({ type: types.PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS, data });
export const sendHallWithWorkplacesFailure = error => ({ type: types.PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE, error });