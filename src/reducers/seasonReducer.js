import {
    GET_SEASON,
    LOADING,
    ERROR
} from '../types/seasonTypes'

const done = {
    loading: false,
    error: false
}

const INITIAL_STATE = {
    detailedSeasons: {},
    ...done
}

const seasonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SEASON:
            return {
                ...state,
                detailedSeasons: action.payload,
                ...done
            }
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default seasonReducer