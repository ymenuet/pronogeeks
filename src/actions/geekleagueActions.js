import axios from 'axios'
import {
    ADD_GEEKLEAGUE,
    LOADING,
    ERROR
} from '../types/geekleagueTypes'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/geekLeagues` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/geekLeagues`

const geekleagueService = axios.create({
    baseURL,
    withCredentials: true
})

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