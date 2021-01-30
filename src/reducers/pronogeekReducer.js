import {
    ADD_PRONOGEEKS,
    LOADING,
    ERROR
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
    ...done
}

const pronogeekReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PRONOGEEKS:
            return {
                ...state,
                userPronogeeks: action.payload,
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