const PRODUCTION_HALL_UPDATE = 'PRODUCTION_HALL_UPDATE';
const PRODUCTION_HALL_LAYOUT_CLEAR = 'PRODUCTION_HALL_LAYOUT_CLEAR';

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PRODUCTION_HALL_UPDATE:
            return { ...state, ...action.data }
        case PRODUCTION_HALL_LAYOUT_CLEAR: {
            const { polygonPoints, ...hall } = state;
            return hall;
        }
        default:
            return state
    }
}

// Action creators
export const updateProductionHall = data => ({ type: PRODUCTION_HALL_UPDATE, data })
export const clearProductionHallLayout = () => ({ type: PRODUCTION_HALL_LAYOUT_CLEAR })

// Selectors
export const getProductionHall = state => state.productionHall;