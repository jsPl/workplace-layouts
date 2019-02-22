// https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/

export const isDrawingMode = state => state.appUi.isDrawingMode;
export const getProductionHall = state => state.productionHall;

export const getWorkplaces = state => state.workplaces;
export const getSelectedWorkplaceId = state => state.appUi.selectedWorkplace;
export const getSelectedWorkplace = state => getWorkplaces(state).find(o => o.id === getSelectedWorkplaceId(state));
export const isLoadingWorkplaces = state => state.appUi.isLoadingWorkplaces;

export const getError = state => state.appUi.error;