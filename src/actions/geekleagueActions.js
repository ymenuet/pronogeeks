import axios from 'axios'
import {
    UPDATE_GEEKLEAGUES,
    EDIT_GEEKLEAGUE,
    RESET_EDIT_GEEKLEAGUE,
    DELETE_GEEKLEAGUE,
    RESET_DELETE_GEEKLEAGUE,
    OUT_GEEKLEAGUE,
    RESET_OUT_GEEKLEAGUE,
    LOADING,
    ERROR,
    ERROR_RESET,
} from '../utils/reduxTypes/geekleagueTypes'
import {
    LOGIN
} from '../utils/reduxTypes/authTypes'
import {
    printError,
    copyReducer,
} from '../utils/helpers'
import {
    GEEKLEAGUE_REDUCER_KEY,
    GEEKLEAGUES_KEY
} from '../utils/reducerKeys/geekleague'
import {
    AUTH_REDUCER_KEY,
    USER_KEY
} from '../utils/reducerKeys/auth'
import {
    RESET_TIMEOUT_IN_MS
} from '../utils/constants.js'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/geekLeagues` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/geekLeagues`

const geekleagueService = axios.create({
    baseURL,
    withCredentials: true
})

export const createLeague = ({
    name,
    geeks
}) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                geekleague
            }
        } = await geekleagueService.post('/', {
            name,
            geeks
        })

        const newLeagues = copyReducer(getState, GEEKLEAGUE_REDUCER_KEY, GEEKLEAGUES_KEY)

        newLeagues[geekleague._id] = geekleague
        delete newLeagues.empty

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: newLeagues
        })

        const newUser = copyReducer(getState, AUTH_REDUCER_KEY, USER_KEY)
        newUser.geekLeagues = [...newUser.geekLeagues, geekleague]

        dispatch({
            type: LOGIN,
            payload: newUser
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de la création de la ligue. Essaye encore.`)
        })
    }
}

export const getLeague = leagueID => async(dispatch, getState) => {

    const loadingLeague = copyReducer(getState, GEEKLEAGUE_REDUCER_KEY, GEEKLEAGUES_KEY, leagueID)
    loadingLeague[leagueID].loading = true
    loadingLeague[leagueID].error = false

    dispatch({
        type: UPDATE_GEEKLEAGUES,
        payload: loadingLeague
    })

    try {
        const {
            data: {
                geekleague
            }
        } = await geekleagueService.get(`/${leagueID}`)

        const newLeagues = copyReducer(getState, GEEKLEAGUE_REDUCER_KEY, GEEKLEAGUES_KEY)
        newLeagues[leagueID] = geekleague

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: newLeagues
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        const errorLeague = copyReducer(getState, GEEKLEAGUE_REDUCER_KEY, GEEKLEAGUES_KEY, leagueID)
        errorLeague[leagueID].loading = false
        errorLeague[leagueID].error = printError('fr', error, `Erreur lors du chargement de la ligue. Recharge la page ou réessaye plus tard.`)

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: errorLeague
        })
    }
}

export const getUserLeagues = () => async(dispatch, getState) => {

    const loadingLeagues = copyReducer(getState, GEEKLEAGUE_REDUCER_KEY, GEEKLEAGUES_KEY)
    loadingLeagues.loading = true
    loadingLeagues.error = false

    dispatch({
        type: UPDATE_GEEKLEAGUES,
        payload: loadingLeagues
    })

    try {
        const {
            data: {
                userGeekleagues
            }
        } = await geekleagueService.get('/')

        const newLeagues = {}

        if (!userGeekleagues.length) newLeagues.empty = true

        else
            for (let league of userGeekleagues) {
                newLeagues[league._id] = league
            }

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: newLeagues
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        const errorLeagues = copyReducer(getState, GEEKLEAGUE_REDUCER_KEY, GEEKLEAGUES_KEY)
        errorLeagues.loading = false
        errorLeagues.error = printError('fr', error, `Erreur lors du chargement des ligues. Recharge la page ou réessaye plus tard.`)

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: errorLeagues
        })
    }
}

export const editLeague = (geekleagueID, {
    name,
    geeks
}) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                geekleague
            }
        } = await geekleagueService.put(`/${geekleagueID}`, {
            name,
            geeks
        })

        const editedLeague = copyReducer(getState, GEEKLEAGUE_REDUCER_KEY, GEEKLEAGUES_KEY, geekleagueID)
        editedLeague[geekleagueID] = geekleague

        dispatch({
            type: EDIT_GEEKLEAGUE,
            payload: editedLeague
        })

        setTimeout(() => {
            dispatch({
                type: RESET_EDIT_GEEKLEAGUE
            })
        }, RESET_TIMEOUT_IN_MS)

    } catch (error) {
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de la sauvegarde de la ligue. Essaye encore.`)
        })
    }
}

export const deleteLeague = geekleagueID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        await geekleagueService.delete(`/${geekleagueID}`)

        deleteLeagueFromStore({
            dispatch,
            getState,
            geekleagueID,
            type: DELETE_GEEKLEAGUE,
            resetType: RESET_DELETE_GEEKLEAGUE
        })

    } catch (error) {
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de la suppression de la ligue. Essaye encore.`)
        })
    }
}

export const outLeague = geekleagueID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        await geekleagueService.get(`out/${geekleagueID}`)

        deleteLeagueFromStore({
            dispatch,
            getState,
            geekleagueID,
            type: OUT_GEEKLEAGUE,
            resetType: RESET_OUT_GEEKLEAGUE
        })

    } catch (error) {
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de ta sortie de la ligue. Essaye encore.`)
        })
    }
}

export const resetGeekleagueError = () => dispatch => {
    dispatch({
        type: ERROR_RESET
    })
}

function deleteLeagueFromStore({
    dispatch,
    getState,
    geekleagueID,
    type,
    resetType
}) {

    const filteredArray = Object.values(copyReducer(getState, GEEKLEAGUE_REDUCER_KEY, GEEKLEAGUES_KEY)).filter(league => league._id !== geekleagueID)
    const filteredLeagues = {}

    for (let league of filteredArray) {
        filteredLeagues[league._id] = league
    }

    dispatch({
        type: type,
        payload: filteredLeagues
    })

    setTimeout(() => {
        dispatch({
            type: resetType
        })
    }, RESET_TIMEOUT_IN_MS)

    const newUser = copyReducer(getState, AUTH_REDUCER_KEY, USER_KEY)
    newUser.geekLeagues = newUser.geekLeagues.filter(league => league._id !== geekleagueID)
    if (`${newUser.geekLeagueHistory}` === `${geekleagueID}`) newUser.geekLeagueHistory = null

    dispatch({
        type: LOGIN,
        payload: newUser
    })
}