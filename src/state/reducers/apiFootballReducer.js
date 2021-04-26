import {
    STATUS_UPDATED,
    RESET_STATUS_UPDATED,
    ODDS_UPDATED,
    RESET_ODDS_UPDATED,
    WARNING_MESSAGE,
    RESET_WARNING_MESSAGE,
    LOADING,
    ERROR,
    ERROR_RESET
} from '../types/apiFootballTypes'
import {
    LOGOUT,
    DELETE_ACCOUNT
} from '../types/authTypes'

const done = {
    loading: false,
    error: false
}

const INITIAL_STATE = {
    statusUpdated: false,
    oddsUpdated: false,
    warningMessage: false,
    ...done,
}

const apiFootballReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STATUS_UPDATED:
            return {
                ...state,
                statusUpdated: true,
                ...done
            }
        case RESET_STATUS_UPDATED:
            return {
                ...state,
                statusUpdated: false
            }
        case ODDS_UPDATED:
            return {
                ...state,
                oddsUpdated: true,
                ...done
            }
        case RESET_ODDS_UPDATED:
            return {
                ...state,
                oddsUpdated: false
            }
        case WARNING_MESSAGE:
            return {
                ...state,
                warningMessage: action.payload,
                ...done
            }
        case RESET_WARNING_MESSAGE:
            return {
                ...state,
                warningMessage: false
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

export default apiFootballReducer