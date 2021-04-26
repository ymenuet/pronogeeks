import {
    ADD_USER_PRONOGEEKS,
    ADD_GEEK_MATCHWEEK_PRONOGEEKS,
    ADD_GEEKS_FIXTURE_PRONOGEEKS,
} from '../types/pronogeekTypes'
import {
    LOGOUT,
    DELETE_ACCOUNT
} from "../types/authTypes"

const INITIAL_STATE = {
    userPronogeeks: {},
    geeksMatchweekPronogeeks: {},
    geeksFixturePronogeeks: {},
}

const pronogeekReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER_PRONOGEEKS:
            return {
                ...state,
                userPronogeeks: action.payload,
            }
        case ADD_GEEK_MATCHWEEK_PRONOGEEKS:
            return {
                ...state,
                geeksMatchweekPronogeeks: action.payload,
            }
        case ADD_GEEKS_FIXTURE_PRONOGEEKS:
            return {
                ...state,
                geeksFixturePronogeeks: action.payload,
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