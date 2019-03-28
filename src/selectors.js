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

export const getProcesses = state => state.processes;
export const getProcessesByFilter = createSelector(
    getProcesses, (state, props) => props.filter,
    (processes, filter) => {
        if (filter === null || filter.trim() === '') {
            return processes;
        }
        return processes.filter(o => o.title.toLowerCase().includes(filter.toLowerCase()))
    }
)

export const getSelectedProcessesId = state => state.ui.selectedProcesses;

// export const getWorkplacesByFilter = (state, { filter }) => {
//     const workplaces = getWorkplaces(state);
//     console.log('selector getWorkplacesByTitle', workplaces, filter)
//     if (filter === null || filter.trim() === '') {
//         return workplaces;
//     }
//     return workplaces.filter(o => o.title.toLowerCase().includes(filter.toLowerCase()))
// }

export const getSelectedWorkplacesId = state => state.ui.selectedWorkplaces;
export const getSelectedWorkplaces = createSelector(
    getWorkplaces, getSelectedWorkplacesId,
    (workplaces, selectedIds) => workplaces.filter(o => selectedIds.includes(o.id))
)

export const getOperationsOfSelectedProcesses = state => {
    return getSelectedProcessesId(state).flatMap(id => getOperationsByProcess(state, id) || [])
}

export const getOperationsByProcess = (state, processId) => state.operations.byProcess[processId];

export const isLoadingWorkplaces = state => state.ui.isLoadingWorkplaces;
export const isLoadingOperations = state => state.ui.isLoadingOperations;

export const isSaving = state => state.ui.isSaving;
export const getMessage = state => state.ui.message;
export const isMeasureToolMode = state => state.ui.isMeasureToolMode;
export const isSvgWorkplacePictureVisible = state => state.ui.isSvgWorkplacePictureVisible;
export const getSelectedItemsActiveTab = state => state.ui.selectedItemsActiveTab;