import {
    ALL_GEEKS,
    DETAILS_GEEK,
    SAVE_FAV_TEAM,
    SAVE_FAV_TEAM_RESET,
    DONE,
    LOADING,
    ERROR,
    ERROR_RESET
} from '../types/geekTypes'

const notLoading = {
    loading: false,
}

const done = {
    error: false,
    ...notLoading
}

const INITIAL_STATE = {
    allGeeks: {},
    detailedGeeks: {},
    favTeamAdded: false,
    ...done
}


const geekReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALL_GEEKS:
            return {
                ...state,
                allGeeks: action.payload,
                ...done
            }
        case DETAILS_GEEK:
            return {
                ...state,
                detailedGeeks: action.payload,
                ...done
            }
        case SAVE_FAV_TEAM:
            return {
                ...state,
                favTeamAdded: true,
                ...done
            }
        case SAVE_FAV_TEAM_RESET:
            return {
                ...state,
                favTeamAdded: false
            }
        case DONE:
            return {
                ...state,
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
        case ERROR_RESET:
            return {
                ...state,
                error: false
            }
        default:
            return state
    }
}

export default geekReducer