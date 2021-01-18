import axios from 'axios'
import {
    LOADING,
    ERROR,
    SIGNUP,
    LOGIN,
    LOGOUT,
} from "../types/authTypes"

const baseURL = process.env.NODE_ENV === 'production' ?
    `/auth` :
    `${process.env.REACT_APP_BACKENDPOINT}/auth`

const authService = axios.create({
    baseURL,
    withCredentials: true
})

export const signup = ({
    email,
    username,
    password,
    photo
}) => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        await authService.post('/signup', {
            email,
            username,
            password,
            photo
        })
        dispatch({
            type: SIGNUP
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data.message.fr
        })
    }
}

export const login = ({
    email,
    password
}) => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        await authService.post('/login', ({
            email,
            password
        }))
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

export const updateUsername = newUsername => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        const {
            data: {
                user
            }
        } = await authService.put('/edit', {
            username: newUsername
        })
        dispatch({
            type: LOGIN,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data.message.fr
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