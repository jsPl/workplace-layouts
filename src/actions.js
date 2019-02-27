export const addWorkplace = data => ({ type: 'ADD_WORKPLACE', data })
export const updateWorkplace = ({ id, ...data }) => ({ type: 'UPDATE_WORKPLACE', id, data })
export const removeWorkplace = id => ({ type: 'REMOVE_WORKPLACE', id })

export const fetchWorkplace = id => ({ type: 'FETCH_WORKPLACE', id })
export const patchWorkplace = (id, payload) => ({ type: 'PATCH_WORKPLACE', id, payload })
export const fetchWorkplaces = () => ({ type: 'FETCH_WORKPLACES' })
export const fetchWorkplaceSuccess = data => ({ type: 'FETCH_WORKPLACE_SUCCESS', data })
export const fetchWorkplaceFailure = error => ({ type: 'FETCH_WORKPLACE_FAILURE', error })

export const selectWorkplace = id => ({ type: 'SELECT_WORKPLACE', id })

export const toggleDrawingMode = isDrawingMode => ({ type: 'TOGGLE_DRAWING_MODE', isDrawingMode })

export const updateProductionHall = data => ({ type: 'UPDATE_PRODUCTION_HALL', data })

export const saveAllData = () => ({ type: 'SAVE_ALL_DATA' });
export const saveAllDataSuccess = data => ({ type: 'SAVE_ALL_DATA_SUCCESS', data });
export const saveAllDataFailure = error => ({ type: 'SAVE_ALL_DATA_FAILURE', error });