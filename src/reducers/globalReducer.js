import {
    CHANGE_THEME
} from '../utils/reduxTypes/global'

const INITIAL_STATE = {
    appTheme: null,
}

const globalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                appTheme: action.payload,
            }
        default:
            return state
    }
}

export default globalReducer