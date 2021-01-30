import {
    ADD_SEASON,
    LOADING,
    ERROR
} from '../types/seasonTypes'
import {
    LOGOUT,
    DELETE_ACCOUNT
} from "../types/authTypes"

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
        case ADD_SEASON:
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
        case LOGOUT:
            return INITIAL_STATE
        case DELETE_ACCOUNT:
            return INITIAL_STATE
        default:
            return state
    }
}

export default seasonReducer