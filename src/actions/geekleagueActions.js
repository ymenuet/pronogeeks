import axios from 'axios'
import {
    UPDATE_GEEKLEAGUES,
    LOADING,
    ERROR,
    ERROR_RESET
} from '../types/geekleagueTypes'
import {
    LOGIN
} from '../types/authTypes'
import {
    copyObject1Layer,
    copyObject2Layers
} from '../helpers'

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

        const {
            geekleagues
        } = getState().geekleagueReducer
        const newLeagues = copyObject1Layer(geekleagues)
        newLeagues[geekleague._id] = geekleague

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: newLeagues
        })

        const {
            user
        } = getState().authReducer
        const newUser = {
            ...user
        }
        newUser.geekLeagues = [...user.geekLeagues, geekleague._id]

        dispatch({
            type: LOGIN,
            payload: newUser
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Erreur lors de la création de la ligue. Essaye encore.`
        })
    }
}

export const getLeague = leagueID => async(dispatch, getState) => {
    const {
        geekleagues
    } = getState().geekleagueReducer

    const loadingLeague = copyObject2Layers(geekleagues, leagueID)
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

        const {
            geekleagues
        } = getState().geekleagueReducer

        const newLeagues = copyObject1Layer(geekleagues)
        newLeagues[leagueID] = geekleague

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: newLeagues
        })

    } catch (error) {
        const {
            geekleagues
        } = getState().geekleagueReducer

        const errorLeague = copyObject2Layers(geekleagues, leagueID)
        errorLeague[leagueID].loading = false
        errorLeague[leagueID].error = `Erreur lors du chargement de la ligue. Recharge la page ou réessaye plus tard.`

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: errorLeague
        })
    }
}

export const getUserLeagues = () => async(dispatch, getState) => {

    const {
        geekleagues
    } = getState().geekleagueReducer

    const loadingLeagues = copyObject1Layer(geekleagues)
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

        const {
            geekleagues
        } = getState().geekleagueReducer
        const newLeagues = copyObject1Layer(geekleagues)
        delete newLeagues.loading
        delete newLeagues.error

        for (let league of userGeekleagues) {
            newLeagues[league._id] = league
        }

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: newLeagues
        })

    } catch (error) {
        const {
            geekleagues
        } = getState().geekleagueReducer

        const errorLeagues = copyObject1Layer(geekleagues)
        errorLeagues.loading = false
        errorLeagues.error = `Erreur lors du chargement des ligues. Recharge la page ou réessaye plus tard.`

        dispatch({
            type: UPDATE_GEEKLEAGUES,
            payload: errorLeagues
        })
    }
}

export const resetGeekleagueError = () => dispatch => {
    dispatch({
        type: ERROR_RESET
    })
}