export const addWorkplace = (id, title, color, width, height) => ({
    type: 'ADD_WORKPLACE', id, title, color, width, height
})

export const updateWorkplace = ({ id, ...data }) => ({
    type: 'UPDATE_WORKPLACE',
    id,
    data
})

export const removeWorkplace = (id) => ({
    type: 'REMOVE_WORKPLACE', id
})

export const selectWorkplace = (id) => ({
    type: 'SELECT_WORKPLACE', id
})

export const toggleDrawingMode = (isDrawing) => ({
    type: 'TOGGLE_DRAWING_MODE', isDrawing
})

export const updateProductionHall = ({ ...data }) => ({
    type: 'UPDATE_PRODUCTION_HALL',
    data
})