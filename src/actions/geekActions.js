import axios from 'axios'
import {
    ALL_GEEKS,
    DETAILS_GEEK,
    SAVE_FAV_TEAM,
    SAVE_FAV_TEAM_RESET,
    LOADING,
    ERROR,
    ERROR_RESET
} from '../types/geekTypes'
import {
    LOGIN
} from '../types/authTypes'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/geek` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/geek`

const geekService = axios.create({
    baseURL,
    withCredentials: true
})

export const getAllGeeks = () => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        const {
            data: {
                geeks
            }
        } = await geekService.get('/')
        const geeksObject = {}
        geeks.map(geek => {
            geeksObject[geek._id] = geek
            return geek
        })
        dispatch({
            type: ALL_GEEKS,
            payload: geeksObject
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Erreur lors du chargement des joueurs. Recharge la page ou réessaye plus tard.'
        })
    }
}

export const getDetailsGeek = geekID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const {
        detailedGeeks
    } = getState().geekReducer
    const newDetailedGeeks = {
        ...detailedGeeks
    }

    try {
        const {
            data: {
                geek
            }
        } = await geekService.get(`/${geekID}`)
        newDetailedGeeks[geek._id] = geek
        dispatch({
            type: DETAILS_GEEK,
            payload: newDetailedGeeks
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Erreur lors du chargement des pronos. Recharge la page ou réessaye plus tard.'
        })
    }
}

export const saveFavTeam = (seasonID, teamID) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                geekSeason
            }
        } = await geekService.put(`/favTeam/${seasonID}`, {
            teamID
        })

        const {
            user
        } = getState().authReducer
        const newUser = {
            ...user
        }
        newUser.seasons.push(geekSeason)

        dispatch({
            type: LOGIN,
            payload: newUser
        })
        dispatch({
            type: SAVE_FAV_TEAM
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "Erreur lors de l'enregistrement de l'équipe de coeur. Recharge la page ou réessaye plus tard."
        })
    }
}

export const resetFavTeamAdded = () => dispatch => {
    dispatch({
        type: SAVE_FAV_TEAM_RESET
    })
}

export const resetGeekError = () => dispatch => {
    dispatch({
        type: ERROR_RESET
    })
}