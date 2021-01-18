import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/auth` :
    `${process.env.REACT_APP_BACKENDPOINT}/auth`

const authService = axios.create({
    baseURL,
    withCredentials: true
})

export const updatePhoto = async(userData) => {
    await authService.put('/editPic', userData)
    return getProfile()
}

export const getProfile = async() => {
    const {
        data: {
            user
        }
    } = await authService.get('/profile')
    return user
}

export const changePwd = async(email) => {
    await authService.put(`/reset-pwd`, {
        email
    })
    return true
}

export const updatePwd = async(userID, renewToken, password) => {
    await authService.put(`/new-pwd/${userID}/${renewToken}`, {
        password
    })
    return true
}