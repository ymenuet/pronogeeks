import {
    LOADING,
    ERROR,
    LOGIN,
    LOGOUT
} from "../types/authTypes"

const INITIAL_STATE = {
    user: {},
    loading: false,
    error: false
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: false
            }
        case LOGOUT:
            return {}
        default:
            return state
    }
}

export default authReducer