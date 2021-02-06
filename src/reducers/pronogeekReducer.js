import {
    ADD_USER_PRONOGEEKS,
    ADD_GEEK_MATCHWEEK_PRONOGEEKS,
    ADD_GEEKS_FIXTURE_PRONOGEEKS,
    LOADING,
    ERROR,
} from '../types/pronogeekTypes'
import {
    LOGOUT,
    DELETE_ACCOUNT
} from "../types/authTypes"

const done = {
    loading: false,
    error: false
}

const INITIAL_STATE = {
    userPronogeeks: {},
    geeksMatchweekPronogeeks: {},
    geeksFixturePronogeeks: {},
    ...done
}

const pronogeekReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER_PRONOGEEKS:
            return {
                ...state,
                userPronogeeks: action.payload,
                ...done
            }
        case ADD_GEEK_MATCHWEEK_PRONOGEEKS:
            return {
                ...state,
                geeksMatchweekPronogeeks: action.payload,
                ...done
            }
        case ADD_GEEKS_FIXTURE_PRONOGEEKS:
            return {
                ...state,
                geeksFixturePronogeeks: action.payload,
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

export default pronogeekReducer