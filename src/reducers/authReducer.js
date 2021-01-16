import {
    LOADING,
    ERROR,
    LOGIN
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
                loading: true
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
                loading: false
            }
        default:
            return state
    }
}

export default authReducer