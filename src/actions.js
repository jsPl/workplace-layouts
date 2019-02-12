const workplaceDefaults = {
    title: 'untitled workplace',
    color: '#FFCF60',
    width: 100,
    height: 100,
    x: 0,
    y: 0
}

export const addWorkplace = (data) => {
    return {
        type: 'ADD_WORKPLACE',
        data: Object.assign({}, workplaceDefaults, data)
    }
}

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

export const toggleDrawingMode = (isDrawingMode) => ({
    type: 'TOGGLE_DRAWING_MODE', isDrawingMode
})

export const updateProductionHall = ({ ...data }) => ({
    type: 'UPDATE_PRODUCTION_HALL',
    data
})