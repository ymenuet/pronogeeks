import {
    UPDATE_GEEKLEAGUES,
    EDIT_GEEKLEAGUE,
    RESET_EDIT_GEEKLEAGUE,
    DELETE_GEEKLEAGUE,
    RESET_DELETE_GEEKLEAGUE,
    OUT_GEEKLEAGUE,
    RESET_OUT_GEEKLEAGUE,
    LOADING,
    ERROR,
    ERROR_RESET
} from '../utils/reduxTypes/geekleagueTypes'
import {
    LOGOUT,
    DELETE_ACCOUNT
} from "../utils/reduxTypes/authTypes"

const done = {
    loading: false,
    error: false
}

const INITIAL_STATE = {
    geekleagues: {},
    geekleagueEdited: false,
    geekleagueDeleted: false,
    geekleagueOut: false,
    ...done
}

const geekleagueReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_GEEKLEAGUES:
            return {
                ...state,
                geekleagues: action.payload,
                ...done
            }
        case EDIT_GEEKLEAGUE:
            return {
                ...state,
                geekleagues: action.payload,
                geekleagueEdited: true,
                ...done
            }
        case RESET_EDIT_GEEKLEAGUE:
            return {
                ...state,
                geekleagueEdited: false,
            }
        case DELETE_GEEKLEAGUE:
            return {
                ...state,
                geekleagues: action.payload,
                geekleagueDeleted: true,
                ...done
            }
        case RESET_DELETE_GEEKLEAGUE:
            return {
                ...state,
                geekleagueDeleted: false,
            }
        case OUT_GEEKLEAGUE:
            return {
                ...state,
                geekleagues: action.payload,
                geekleagueOut: true,
                ...done
            }
        case RESET_OUT_GEEKLEAGUE:
            return {
                ...state,
                geekleagueOut: false,
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

export default geekleagueReducer