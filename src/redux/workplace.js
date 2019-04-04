import { createSelector } from 'reselect';
import { isNullOrEmpty } from '../util/utils';

// Action types
export const PRODUCTION_HALL_WITH_WORKPLACES_FETCH = 'PRODUCTION_HALL_WITH_WORKPLACES_FETCH';
export const PRODUCTION_HALL_WITH_WORKPLACES_FETCH_SUCCESS = 'PRODUCTION_HALL_WITH_WORKPLACES_FETCH_SUCCESS';
export const PRODUCTION_HALL_WITH_WORKPLACES_FETCH_FAILURE = 'PRODUCTION_HALL_WITH_WORKPLACES_FETCH_FAILURE';

export const PRODUCTION_HALL_WITH_WORKPLACES_SEND = 'PRODUCTION_HALL_WITH_WORKPLACES_SEND';
export const PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS = 'PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS';
export const PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE = 'PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE';

const WORKPLACE_ADD = 'WORKPLACE_ADD';
const WORKPLACE_UPDATE = 'WORKPLACE_UPDATE';
const WORKPLACE_REMOVE = 'WORKPLACE_REMOVE';
export const WORKPLACE_SELECT = 'WORKPLACE_SELECT';

const initialState = {
    workplaces: [],
    loading: false,
    saving: false,
    selected: [],
}

// Reducers
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case WORKPLACE_ADD:
        case WORKPLACE_REMOVE:
        case WORKPLACE_UPDATE:
            return { ...state, workplaces: workplaces(state.workplaces, action) }
        case WORKPLACE_SELECT:
            return { ...state, selected: action.payload.ids }
        case PRODUCTION_HALL_WITH_WORKPLACES_FETCH:
            return { ...state, loading: true }
        case PRODUCTION_HALL_WITH_WORKPLACES_FETCH_SUCCESS:
        case PRODUCTION_HALL_WITH_WORKPLACES_FETCH_FAILURE:
            return { ...state, loading: false }
        case PRODUCTION_HALL_WITH_WORKPLACES_SEND:
            return { ...state, saving: true }
        case PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS:
        case PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE:
            return { ...state, saving: false }
        default:
            return state
    }
}

const workplaces = (state = [], action) => {
    switch (action.type) {
        case WORKPLACE_ADD:
            if (state.find(o => o.id === action.data.id)) {
                return state;
            }
            return [...state, { ...action.data }];
        case WORKPLACE_REMOVE:
            return state.filter(workplace => workplace.id !== action.id)
        case WORKPLACE_UPDATE:
            return state.map(workplace =>
                (workplace.id === action.id)
                    ? { ...workplace, ...action.data }
                    : workplace
            )
        default:
            return state
    }
}

// Action creators
export const addWorkplace = data => ({ type: WORKPLACE_ADD, data })
export const updateWorkplace = ({ id, ...data }) => ({ type: WORKPLACE_UPDATE, id, data })
export const removeWorkplace = id => ({ type: WORKPLACE_REMOVE, id })
export const selectWorkplace = payload => ({ type: WORKPLACE_SELECT, payload })

export const fetchHallWithWorkplaces = () => ({ type: PRODUCTION_HALL_WITH_WORKPLACES_FETCH })
export const fetchHallWithWorkplacesSuccess = data => ({ type: PRODUCTION_HALL_WITH_WORKPLACES_FETCH_SUCCESS, data })
export const fetchHallWithWorkplacesFailure = error => ({ type: PRODUCTION_HALL_WITH_WORKPLACES_FETCH_FAILURE, error })

export const sendHallWithWorkplaces = () => ({ type: PRODUCTION_HALL_WITH_WORKPLACES_SEND });
export const sendHallWithWorkplacesSuccess = data => ({
    type: PRODUCTION_HALL_WITH_WORKPLACES_SEND_SUCCESS, data,
    success: { type: 'success', message: 'Success' }
});
export const sendHallWithWorkplacesFailure = error => ({ type: PRODUCTION_HALL_WITH_WORKPLACES_SEND_FAILURE, error });

// Selectors
export const getWorkplaces = ({ workplace }) => workplace.workplaces;
export const getSelectedWorkplacesId = ({ workplace }) => workplace.selected;
export const isSaving = ({ workplace }) => workplace.saving;
export const isLoadingWorkplaces = ({ workplace }) => workplace.loading;

export const getWorkplacesByFilter = createSelector(
    getWorkplaces, (state, props) => props.filter,
    (workplaces, filter) => {
        return isNullOrEmpty(filter) ?
            workplaces : workplaces.filter(o => o.title.toLowerCase().includes(filter.toLowerCase()))
    }
)
export const getSelectedWorkplaces = createSelector(
    getWorkplaces, getSelectedWorkplacesId,
    (workplaces, selectedIds) => workplaces.filter(o => selectedIds.includes(o.id))
)