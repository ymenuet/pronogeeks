import axios from 'axios'
import {
    LOADING,
    ERROR,
    LOGIN,
    LOGOUT
} from "../types/authTypes"

const baseURL = process.env.NODE_ENV === 'production' ?
    `/auth` :
    `${process.env.REACT_APP_BACKENDPOINT}/auth`

const authService = axios.create({
    baseURL,
    withCredentials: true
})

export const login = userData => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        await authService.post('/login', userData)
        const user = await getProfile()
        dispatch({
            type: LOGIN,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        await authService.get('/logout')
        dispatch({
            type: LOGOUT
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Problème lors de la déconnexion. Rééssaye plus tard.'
        })
    }
}

export const setProfile = () => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        const user = await getProfile()
        dispatch({
            type: LOGIN,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Problème lors de la connexion. Réessaye plus tard.'
        })
    }
}

async function getProfile() {
    const {
        data: {
            user
        }
    } = await authService.get('/profile')
    return user
}