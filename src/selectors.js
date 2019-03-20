// https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/
// https://redux.js.org/recipes/computing-derived-data
// https://medium.com/@benipsen/seven-months-into-redux-two-things-my-team-learned-along-the-way-5d979c25ea61

import { createSelector } from 'reselect';

export const getProductionHall = state => state.productionHall;

export const getWorkplaces = state => state.workplaces;

export const getWorkplacesByFilter = createSelector(
    getWorkplaces, (state, props) => props.filter,
    (workplaces, filter) => {
        if (filter === null || filter.trim() === '') {
            return workplaces;
        }
        return workplaces.filter(o => o.title.toLowerCase().includes(filter.toLowerCase()))
    }
)

// export const getWorkplacesByFilter = (state, { filter }) => {
//     const workplaces = getWorkplaces(state);
//     console.log('selector getWorkplacesByTitle', workplaces, filter)
//     if (filter === null || filter.trim() === '') {
//         return workplaces;
//     }
//     return workplaces.filter(o => o.title.toLowerCase().includes(filter.toLowerCase()))
// }

export const getSelectedWorkplacesId = state => state.appUi.selectedWorkplaces;
export const getSelectedWorkplaces = createSelector(
    getWorkplaces, getSelectedWorkplacesId,
    (workplaces, selectedIds) => workplaces.filter(o => selectedIds.includes(o.id))
)

export const isLoadingWorkplaces = state => state.appUi.isLoadingWorkplaces;

export const isSaving = state => state.appUi.isSaving;
export const getMessage = state => state.appUi.message;
export const isMeasureToolMode = state => state.appUi.isMeasureToolMode;
export const isSvgWorkplacePictureVisible = state => state.appUi.isSvgWorkplacePictureVisible;