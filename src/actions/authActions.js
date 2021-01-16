import axios from 'axios'
import {
    LOADING,
    ERROR,
    LOGIN
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
        const {
            data: {
                user
            }
        } = await authService.get('/profile')

        dispatch({
            type: LOGIN,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message.fr
        })
    }

}