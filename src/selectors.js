// https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/
// https://redux.js.org/recipes/computing-derived-data
// https://medium.com/@benipsen/seven-months-into-redux-two-things-my-team-learned-along-the-way-5d979c25ea61

import { createSelector } from 'reselect';

export const getProductionHall = state => state.productionHall;

export const getWorkplaces = state => state.workplaces;
export const getSelectedWorkplaceId = state => state.appUi.selectedWorkplace;
export const getSelectedWorkplace = createSelector(
    [getWorkplaces, getSelectedWorkplaceId],
    (workplaces, selectedId) => workplaces.find(o => o.id === selectedId)
)

export const isLoadingWorkplaces = state => state.appUi.isLoadingWorkplaces;

export const isSaving = state => state.appUi.isSaving;
export const getMessage = state => state.appUi.message;
export const isMeasureToolMode = state => state.appUi.isMeasureToolMode;