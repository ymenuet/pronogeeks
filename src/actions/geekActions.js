import axios from 'axios'
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
    LOGIN
} from '../types/authTypes'

import {
    rankGeeks
} from '../helpers'

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

export const getSeasonPlayers = seasonID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                geeks
            }
        } = await geekService.get(`/players/${seasonID}`)

        const rankedGeeks = rankGeeks(geeks, seasonID)

        const {
            seasonGeeksRankings
        } = getState().geekReducer
        const newRankings = {
            ...seasonGeeksRankings
        }
        newRankings[seasonID] = rankedGeeks

        dispatch({
            type: SEASON_GEEKS,
            payload: newRankings
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Erreur lors du chargement du classement. Recharge la page ou réessaye plus tard.`
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
            payload: 'Erreur lors du chargement du profil geek. Recharge la page ou réessaye plus tard.'
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

export const saveGeekLeagueHistory = geekLeagueID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    try {
        await geekService.put(`/geekLeagueHistory/${geekLeagueID}`)
        const {
            user
        } = getState().authReducer
        const newUser = {
            ...user
        }
        newUser.geekLeagueHistory = geekLeagueID

        dispatch({
            type: LOGIN,
            payload: newUser
        })
        dispatch({
            type: DONE
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Erreur lors de la sauvegarde de l'historique de ligue geek.`
        })
    }
}

export const saveUserProvRanking = (seasonID, userProvRanking) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const rankingIDs = userProvRanking.map(team => team._id)

    try {
        await geekService.put(`/provisionalRanking/${seasonID}`, {
            userProvRanking: rankingIDs
        })

        const {
            user
        } = getState().authReducer
        const newUser = {
            ...user
        }
        newUser.seasons.map(season => {
            if (season.season._id.toString() === seasonID) season.provisionalRanking = userProvRanking
            return season
        })

        dispatch({
            type: LOGIN,
            payload: newUser
        })
        dispatch({
            type: SAVE_RANKING
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Erreur lors de la sauvegarde de ton classement. Réessaye plus tard.`
        })
    }
}

export const resetFavTeamAdded = () => dispatch => {
    dispatch({
        type: SAVE_FAV_TEAM_RESET
    })
}

export const resetRankingSaved = () => dispatch => {
    dispatch({
        type: SAVE_RANKING_RESET
    })
}

export const resetGeekError = () => dispatch => {
    dispatch({
        type: ERROR_RESET
    })
}