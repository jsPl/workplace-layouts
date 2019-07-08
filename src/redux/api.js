const API_ADD = 'API_ADD';
const API_CONNECTION_STATE_UPDATE = 'API_CONNECTION_STATE_UPDATE';
const API_RTDE_DATA_RECEIVE = 'API_RTDE_DATA_RECEIVE';

// api: {
// 	byWorkplace: {
// 		128983696: {
// 			api: {
// 				endpoint: 'ws://proedims:8080/ur10',
// 				type: 'ur',
// 				connectionState: 'OPEN',
// 				error: null,
// 			},
// 			rtdeData: {	...	}
// 		}
// 	}
// }

export default function reducer(state = { byWorkplace: {} }, action) {
    switch (action.type) {
        case API_ADD:
        case API_CONNECTION_STATE_UPDATE:
        case API_RTDE_DATA_RECEIVE:
            return { ...state, byWorkplace: apisByWorkplace(state.byWorkplace, action) }
        default:
            return state
    }
}

const apisByWorkplace = (state = {}, action) => {
    switch (action.type) {
        case API_ADD:
        case API_CONNECTION_STATE_UPDATE:
        case API_RTDE_DATA_RECEIVE:
            const { workplace_id } = action.payload;
            return { ...state, [workplace_id]: apiByWorkplace(state[workplace_id], action) }
        default:
            return state
    }
}

const apiByWorkplace = (state = { api: {}, rtdeData: {} }, action) => {
    switch (action.type) {
        case API_ADD:
            const { endpoint, type, connectionState, connector } = action.payload;
            return { ...state, api: { endpoint, type, connectionState, connector } }
        case API_CONNECTION_STATE_UPDATE:
            return { ...state, api: { ...state.api, ...action.payload } }
        case API_RTDE_DATA_RECEIVE:
            return { ...state, rtdeData: action.payload.data }
        default:
            return state
    }
}

// Action creators
export const addApi = (payload = { endpoint: '', type: '', connectionState: '', connector: null }) =>
    ({ type: API_ADD, payload })

export const updateApiConnectionState = (workplace_id, connectionState) =>
    ({ type: API_CONNECTION_STATE_UPDATE, payload: { workplace_id, connectionState } })

export const receiveRtdeData = (workplace_id, data) =>
    ({ type: API_RTDE_DATA_RECEIVE, payload: { workplace_id, data } })

// Selectors
export const getApiByWorkplace = (state, workplaceId) => state.api.byWorkplace[workplaceId]
