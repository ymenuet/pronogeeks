import axios from 'axios'
import {
    SIGNUP,
    CONFIRM_EMAIL,
    LOGIN,
    LOGOUT,
    RESET_PWD,
    UPDATE_PWD,
    DELETE_ACCOUNT,
    LOADING,
    LOADING_USERNAME,
    LOADING_PHOTO,
    PROFILE_ERROR,
    ERROR,
    ERROR_RESET
} from "../utils/reduxTypes/authTypes"
import {
    printError
} from '../utils/helpers'

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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de la création du compte. Essaye encore.`)
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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de la connexion. Essaye encore.`)
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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Problème lors de la déconnexion. Rééssaye plus tard.`)
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
        console.error('ERROR:', error.message)
        dispatch({
            type: PROFILE_ERROR,
            payload: printError('fr', error, `Problème lors de la connexion au server. Recharge la page ou réessaye plus tard.`)
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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, 'Il y a eu une erreur lors de la confirmation de ton email. Merci de réessayer.')
        })
    }
}

export const updateUsername = newUsername => async dispatch => {
    dispatch({
        type: LOADING_USERNAME
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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, 'Erreur lors de la mise à jour du pseudo. Réessaye plus tard.')
        })
    }
}

export const updatePhoto = newPhoto => async dispatch => {
    dispatch({
        type: LOADING_PHOTO
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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, 'Erreur lors de la mise à jour de la photo de profil. Réessaye plus tard.')
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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de l'envoi du lien d'actualisation. Réessaye plus tard.`)
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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de l'actualisation du mot de passe. Réessaye plus tard.`)
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
        console.error('ERROR:', error.message)
        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de la suppression du compte. Réessaye plus tard.`)
        })
    }
}

export const resetAuthError = () => dispatch => {
    dispatch({
        type: ERROR_RESET
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