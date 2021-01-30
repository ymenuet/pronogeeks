import axios from 'axios'
import {
    ADD_PRONOGEEKS,
    LOADING,
    ERROR
} from '../types/pronogeekTypes'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/pronogeeks` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/pronogeeks`

const pronogeekService = axios.create({
    baseURL,
    withCredentials: true
})

export const getMatchweekPronos = (geekID, seasonID, matchweekNumber) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                pronogeeks
            }
        } = await pronogeekService.get(`/geek/${geekID}/season/${seasonID}/matchweek/${matchweekNumber}`)

        const {
            userPronogeeks
        } = getState().pronogeekReducer

        const newPronogeeks = {
            ...userPronogeeks
        }
        newPronogeeks[`${seasonID}-${matchweekNumber}`] = {}
        pronogeeks.map(pronogeek => {
            newPronogeeks[`${seasonID}-${matchweekNumber}`][pronogeek.fixture] = pronogeek
            return pronogeek
        })
        dispatch({
            type: ADD_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Erreur lors du chargement des pronogeeks. Recharge la page ou réessaye plus tard.'
        })
    }
}