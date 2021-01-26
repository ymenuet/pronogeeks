import axios from 'axios'
import {
    LOADING,
    ERROR,
    SIGNUP,
    CONFIRM_EMAIL,
    LOGIN,
    LOGOUT,
    RESET_ERROR,
    USERNAME_LOADING,
    PHOTO_LOADING,
    RESET_PWD,
    UPDATE_PWD,
    DELETE_ACCOUNT
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

export const confirmEmail = (userID, confirmToken) => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        const {
            data: {
                username
            }
        } = await authService.put(`/confirm/${userID}/${confirmToken}`)
        dispatch({
            type: CONFIRM_EMAIL,
            payload: username
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data.message.fr || 'Il y a eu une erreur lors de la confirmation de ton email. Merci de réessayer.'
        })
    }
}

export const updateUsername = newUsername => async dispatch => {
    dispatch({
        type: USERNAME_LOADING
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

export const updatePhoto = newPhoto => async dispatch => {
    dispatch({
        type: PHOTO_LOADING
    })
    try {
        const {
            data: {
                user
            }
        } = await authService.put('/editPic', {
            photo: newPhoto
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

export const resetPwd = email => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        await authService.put(`/reset-pwd`, {
            email
        })
        dispatch({
            type: RESET_PWD
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data.message.fr
        })
    }
}

export const updatePwd = (userID, renewToken, password) => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        await authService.put(`/new-pwd/${userID}/${renewToken}`, {
            password
        })
        dispatch({
            type: UPDATE_PWD
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data.message.fr
        })
    }
}

export const deleteUserAccount = () => async dispatch => {
    try {
        await authService.delete(`/`)
        dispatch({
            type: DELETE_ACCOUNT
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Erreur lors de la suppression du compte. Réessaye plus tard.'
        })
    }
}

export const resetAuthError = () => dispatch => {
    dispatch({
        type: RESET_ERROR
    })
}

async function getProfile() {
    const {
        data: {
            user
        }
    } = await authService.get('/profile')
    return user
}