import {
    LOADING,
    ERROR,
    SIGNUP,
    LOGIN,
    LOGOUT,
    RESET_ERROR,
    USERNAME_LOADING,
    PHOTO_LOADING,
    RESET_PWD,
    UPDATE_PWD,
    DELETE_ACCOUNT
} from "../types/authTypes"

const INITIAL_STATE = {
    user: {},
    signedup: false,
    pwdToReset: false,
    pwdUpdated: false,
    accountDeleted: false,
    loading: false,
    usernameLoading: false,
    photoLoading: false,
    error: false,
}

const done = {
    loading: false,
    usernameLoading: false,
    photoLoading: false,
    error: false,
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
        case RESET_PWD:
            return {
                ...state,
                pwdToReset: true,
                ...done
            }
        case UPDATE_PWD:
            return {
                ...state,
                pwdUpdated: true,
                ...done
            }
        case LOGOUT:
            return {}
        case DELETE_ACCOUNT:
            return {
                accountDeleted: true
            }
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        case USERNAME_LOADING:
            return {
                ...state,
                usernameLoading: true,
                error: false
            }
        case PHOTO_LOADING:
            return {
                ...state,
                photoLoading: true,
                error: false
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                usernameLoading: false,
                photoLoading: false,
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