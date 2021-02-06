import {
    ADD_GEEKLEAGUE,
    LOADING,
    LOADING_LEAGUE,
    ERROR,
    ERROR_LEAGUE,
    ERROR_RESET
} from '../types/geekleagueTypes'
import {
    LOGOUT,
    DELETE_ACCOUNT
} from "../types/authTypes"

const done = {
    loading: false,
    error: false
}

const INITIAL_STATE = {
    geekleagues: {},
    ...done
}

const geekleagueReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_GEEKLEAGUE:
            return {
                ...state,
                geekleagues: action.payload,
                ...done
            }
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        case LOADING_LEAGUE:
            return {
                ...state,
                geekleagues: action.payload,
                loading: true,
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case ERROR_LEAGUE:
            return {
                ...state,
                geekleagues: action.payload,
                loading: false
            }
        case ERROR_RESET:
            return {
                ...state,
                error: false
            }
        case LOGOUT:
            return INITIAL_STATE
        case DELETE_ACCOUNT:
            return INITIAL_STATE
        default:
            return state
    }
}

export default geekleagueReducer