import axios from 'axios'
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
import {
    LOGIN
} from '../types/authTypes'
import {
    GET_SEASON
} from '../types/seasonTypes'

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

export const createGeekSeason = seasonID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                season
            }
        } = await geekService.put(`/season/${seasonID}`)

        const {
            detailedSeasons
        } = getState().seasonReducer
        const newDetailedSeasons = {
            ...detailedSeasons
        }
        newDetailedSeasons[season._id] = season

        dispatch({
            type: GET_SEASON,
            payload: newDetailedSeasons
        })
        dispatch({
            type: DONE
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message || `Erreur lors de l'ajout de la saison au profil. Recharge la page ou réessaye plus tard.`
        })
    }
}

export const createGeekMatchweek = (seasonID, matchweekNumber) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const {
        user
    } = getState().authReducer

    try {
        const {
            data: {
                matchweek
            }
        } = await geekService.put(`/season/${seasonID}/matchweek/${matchweekNumber}`)

        // Modifier le controller pour récupérer la journée et l'ajouter au user

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Erreur lors de l'ajout de la journée au profil. Recharge la page ou réessaye plus tard.`
        })
    }
}

export const saveFavTeam = (seasonID, teamID) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const {
        user
    } = getState().authReducer

    try {
        const {
            data: {
                userFavTeam
            }
        } = await geekService.put(`/favTeam/${seasonID}`, {
            teamID
        })

        const newUser = {
            ...user
        }
        const updatedSeasons = newUser.seasons.map(oneSeason => {
            if (oneSeason.season._id.toString() === seasonID) return {
                ...oneSeason,
                favTeam: userFavTeam
            }
            return oneSeason
        })
        newUser.seasons = updatedSeasons

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