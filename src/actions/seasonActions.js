import axios from 'axios'
import {
    ADD_SEASON,
    LOADING,
    ERROR
} from '../types/seasonTypes'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/seasons` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/seasons`

const seasonService = axios.create({
    baseURL,
    withCredentials: true
})

export const getSeason = seasonID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                season
            }
        } = await seasonService.get(`/${seasonID}`)

        const {
            detailedSeasons
        } = getState().seasonReducer
        const newDetailedSeasons = {
            ...detailedSeasons
        }
        newDetailedSeasons[season._id] = season

        dispatch({
            type: ADD_SEASON,
            payload: newDetailedSeasons
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Erreur lors du chargement des données de la saison. Recharge la page ou réessaye plus tard.'
        })
    }
}