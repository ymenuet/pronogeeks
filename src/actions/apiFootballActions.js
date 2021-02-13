import axios from 'axios'
import {
    STATUS_UPDATED,
    RESET_STATUS_UPDATED,
    ODDS_UPDATED,
    RESET_ODDS_UPDATED,
    WARNING_MESSAGE,
    RESET_WARNING_MESSAGE,
    LOADING,
    ERROR,
    ERROR_RESET,
} from '../types/apiFootballTypes'
import {
    ADD_MATCHWEEK
} from '../types/seasonTypes'
import {
    LOGIN
} from '../types/authTypes'
import {
    copyReducer,
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

        if (message) {
            dispatchWarning(message, 'fr', dispatch)

        } else {
            dispatch({
                type: STATUS_UPDATED
            })

            setTimeout(() => dispatch({
                type: RESET_STATUS_UPDATED
            }), RESET_TIMEOUT_IN_MS)
        }

    } catch (error) {
        console.error('ERROR:', error.message)
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

        if (fixtures) {
            const newMatchweeks = copyReducer(getState, 'seasonReducer', 'seasonMatchweeks', `${seasonID}-${matchweekNumber}`)

            for (let fixture of fixtures) {
                newMatchweeks[`${seasonID}-${matchweekNumber}`].fixtures = newMatchweeks[`${seasonID}-${matchweekNumber}`].fixtures.map(stateFixture => {
                    if (stateFixture._id.toString() === fixture._id.toString()) return fixture
                    return stateFixture
                })
            }

            dispatch({
                type: ADD_MATCHWEEK,
                payload: newMatchweeks
            })
        }

        if (message) {
            dispatchWarning(message, 'fr', dispatch)

        } else {
            dispatch({
                type: ODDS_UPDATED
            })

            setTimeout(() => dispatch({
                type: RESET_ODDS_UPDATED
            }), RESET_TIMEOUT_IN_MS)
        }

    } catch (error) {
        console.error('ERROR:', error.message)
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

function dispatchWarning(message, lang, dispatch) {
    dispatch({
        type: WARNING_MESSAGE,
        payload: message[lang]
    })

    setTimeout(() => dispatch({
        type: RESET_WARNING_MESSAGE
    }), RESET_TIMEOUT_IN_MS)
}