import {
    LOADING,
    ERROR,
    SIGNUP,
    LOGIN,
    LOGOUT,
    RESET_ERROR,
    USERNAME_LOADING
} from "../types/authTypes"

const INITIAL_STATE = {
    user: {},
    signedup: false,
    loading: false,
    error: false,
    usernameLoading: false
}

const done = {
    loading: false,
    error: false,
    usernameLoading: false
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
        case SIGNUP:
            return {
                ...state,
                signedup: true,
                ...done
            }
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                ...done
            }
        case LOGOUT:
            return {}
        case USERNAME_LOADING:
            return {
                ...state,
                usernameLoading: true,
                error: false
            }
        case RESET_ERROR:
            return {
                ...state,
                error: false
            }
        default:
            return state
    }
}

export default authReducer