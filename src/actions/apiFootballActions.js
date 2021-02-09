import axios from 'axios'
import {
    STATUS_UPDATED,
    RESET_STATUS_UPDATED,
    LOADING,
    ERROR,
    ERROR_RESET,
    ODDS_UPDATED,
    RESET_ODDS_UPDATED
} from '../types/apiFootballTypes'
import {
    LOGIN
} from '../types/authTypes'
import {
    printError,
    updateMatchweekFixtures,
    updateMatchweekPronogeeks
} from '../helpers'
import {
    RESET_TIMEOUT_IN_MS
} from '../constants'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/fetch` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/fetch`

const apiFootballService = axios.create({
    baseURL,
    withCredentials: true
})

export const updateFixturesStatus = (seasonID, matchweekNumber) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                fixtures,
                user,
                pronogeeks,
                message
            }
        } = await apiFootballService.get(`/fixtures/season/${seasonID}/matchweek/${matchweekNumber}`)
        console.log(message); // Traiter le cas où les matchs sont déjà tous terminés

        if (fixtures) updateMatchweekFixtures({
            fixtures,
            seasonID,
            matchweekNumber,
            dispatch,
            getState,
        })

        if (pronogeeks) updateMatchweekPronogeeks({
            pronogeeks,
            seasonID,
            matchweekNumber,
            dispatch,
            getState
        })

        if (user) dispatch({
            type: LOGIN,
            payload: user
        })

        dispatch({
            type: STATUS_UPDATED
        })

        setTimeout(() => dispatch({
            type: RESET_STATUS_UPDATED
        }), RESET_TIMEOUT_IN_MS)

    } catch (error) {
        console.error(error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, 'Une erreur a eu lieu lors de la mise à jour des scores.')
        })
    }
}

export const updateOdds = (seasonID, matchweekNumber) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                fixtures,
                message
            }
        } = await apiFootballService.get(`/odds/season/${seasonID}/matchweek/${matchweekNumber}`)
        console.log(message); // Traiter le cas où les matchs sont déjà tous commencés

        if (fixtures) {
            // Remplacer les matchs modifiés, et seulement ceux modifiés, dans le seasonReducer.seasonMatchweeks
        }

        dispatch({
            type: ODDS_UPDATED
        })

        setTimeout(() => dispatch({
            type: RESET_ODDS_UPDATED
        }), RESET_TIMEOUT_IN_MS)

    } catch (error) {
        console.error(error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, 'Une erreur a eu lieu lors de la mise à jour des cotes.')
        })
    }
}

export const resetApiFootballError = () => dispatch => {
    dispatch({
        type: ERROR_RESET
    })
}