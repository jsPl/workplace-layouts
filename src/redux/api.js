import { createSelector } from 'reselect';

const API_ADD = 'API_ADD';
const API_CONNECTION_STATE_UPDATE = 'API_CONNECTION_STATE_UPDATE';
const API_DATA_RECEIVE = 'API_DATA_RECEIVE';

export default function reducer(state = { byWorkplace: {} }, action) {
    switch (action.type) {
        case API_ADD:
        case API_CONNECTION_STATE_UPDATE:
        case API_DATA_RECEIVE:
            return { ...state, byWorkplace: apisByWorkplace(state.byWorkplace, action) }
        default:
            return state
    }
}

const apisByWorkplace = (state = {}, action) => {
    switch (action.type) {
        case API_ADD:
        case API_CONNECTION_STATE_UPDATE:
        case API_DATA_RECEIVE:
            const { workplace_id } = action.payload;
            return { ...state, [workplace_id]: apiByWorkplace(state[workplace_id], action) }
        default:
            return state
    }
}

const apiByWorkplace = (state = { api: {}, rtde_data: {}, dashboard_data: {} }, action) => {
    switch (action.type) {
        case API_ADD:
            const { endpoint, type, connectionState, connector } = action.payload;
            return { ...state, api: { endpoint, type, connectionState, connector } }
        case API_CONNECTION_STATE_UPDATE:
            return { ...state, api: { ...state.api, ...action.payload } }
        case API_DATA_RECEIVE:
            return { ...state, [action.payload.dataType]: action.payload.data }
        default:
            return state
    }
}

// Action creators
export const addApi = (payload = { endpoint: '', type: '', connectionState: '', connector: null }) =>
    ({ type: API_ADD, payload })

export const updateApiConnectionState = (workplace_id, connectionState) =>
    ({ type: API_CONNECTION_STATE_UPDATE, payload: { workplace_id, connectionState } })

export const receiveData = (workplace_id, dataType, data) =>
    ({ type: API_DATA_RECEIVE, payload: { workplace_id, dataType, data } })

// Selectors
const getApis = ({ api }) => api.byWorkplace;
export const getApiByWorkplace = (state, workplaceId) => getApis(state)[workplaceId];
export const getRtdeDataByWorkplace = (state, workplaceId) => getApiByWorkplace(state, workplaceId).rtde_data;
export const getDashboardDataByWorkplace = (state, workplaceId) => getApiByWorkplace(state, workplaceId).dashboard_data;
export const getConnectedApis = createSelector(
    getApis,
    apis => Object.fromEntries(Object.entries(apis).filter(o => o[1].api.connectionState === 'OPEN'))
)