// https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/
// https://redux.js.org/recipes/computing-derived-data
// https://medium.com/@benipsen/seven-months-into-redux-two-things-my-team-learned-along-the-way-5d979c25ea61

export const isDrawingMode = state => state.appUi.isDrawingMode;
export const getProductionHall = state => state.productionHall;
export const getProductionHallLayoutExists = state => getProductionHall(state).polygonPoints != null;

export const getWorkplaces = state => state.workplaces;
export const getSelectedWorkplaceId = state => state.appUi.selectedWorkplace;
export const getSelectedWorkplace = state => getWorkplaces(state).find(o => o.id === getSelectedWorkplaceId(state));
export const isLoadingWorkplaces = state => state.appUi.isLoadingWorkplaces;

export const isSaving = state => state.appUi.isSaving;
export const getMessage = state => state.appUi.message;