import {
    ALL_GEEKS,
    DETAILS_GEEK,
    SEASON_GEEKS,
    SAVE_FAV_TEAM,
    SAVE_FAV_TEAM_RESET,
    SAVE_RANKING,
    SAVE_RANKING_RESET,
    DONE,
    LOADING,
    ERROR,
    ERROR_RESET
} from '../types/geekTypes'
import {
    LOGOUT,
    DELETE_ACCOUNT
} from "../types/authTypes"

const done = {
    error: false,
    loading: false,
}

const INITIAL_STATE = {
    allGeeks: {},
    detailedGeeks: {},
    seasonGeeksRankings: {},
    favTeamAdded: false,
    rankingSaved: false,
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
        case SEASON_GEEKS:
            return {
                ...state,
                seasonGeeksRankings: action.payload,
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
                favTeamAdded: false,
                ...done
            }
        case SAVE_RANKING:
            return {
                ...state,
                rankingSaved: true,
                ...done
            }
        case SAVE_RANKING_RESET:
            return {
                ...state,
                rankingSaved: false,
                ...done
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
        case LOGOUT:
            return INITIAL_STATE
        case DELETE_ACCOUNT:
            return INITIAL_STATE
        default:
            return state
    }
}

export default geekReducer