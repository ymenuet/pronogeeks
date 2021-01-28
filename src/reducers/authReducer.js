import {
    LOADING,
    ERROR,
    SIGNUP,
    CONFIRM_EMAIL,
    LOGIN,
    LOGOUT,
    ERROR_RESET,
    LOADING_USERNAME,
    LOADING_PHOTO,
    RESET_PWD,
    UPDATE_PWD,
    DELETE_ACCOUNT
} from "../types/authTypes"

const notLoading = {
    loading: false,
    loadingUsername: false,
    loadingPhoto: false,
}

const done = {
    error: false,
    ...notLoading
}

const INITIAL_STATE = {
    user: {},
    signedup: false,
    usernameConfirmed: false,
    pwdToReset: false,
    pwdUpdated: false,
    accountDeleted: false,
    ...done
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                signedup: true,
                ...done
            }
        case CONFIRM_EMAIL:
            return {
                ...state,
                usernameConfirmed: action.payload,
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
            return INITIAL_STATE
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
        case LOADING_USERNAME:
            return {
                ...state,
                loadingUsername: true,
                error: false
            }
        case LOADING_PHOTO:
            return {
                ...state,
                loadingPhoto: true,
                error: false
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                ...notLoading
            }
        case ERROR_RESET:
            return {
                ...state,
                error: false
            }
        default:
            return state
    }
}

export default authReducer