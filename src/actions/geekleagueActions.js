import axios from 'axios'
import {
    ADD_GEEKLEAGUE,
    LOADING,
    ERROR,
    ERROR_RESET
} from '../types/geekleagueTypes'
import {
    LOGIN
} from '../types/authTypes'

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
        const newLeagues = {
            ...geekleagues
        }
        newLeagues[geekleague._id] = geekleague

        dispatch({
            type: ADD_GEEKLEAGUE,
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
    dispatch({
        type: LOADING
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
        const newLeagues = {
            ...geekleagues
        }
        newLeagues[leagueID] = geekleague

        dispatch({
            type: ADD_GEEKLEAGUE,
            payload: newLeagues
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Erreur lors du chargement de la ligue. Recharge la page ou réessaye plus tard.`
        })
    }
}

export const resetGeekleagueError = () => dispatch => {
    dispatch({
        type: ERROR_RESET
    })
}