import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/auth` :
    `${process.env.REACT_APP_BACKENDPOINT}/auth`

const authService = axios.create({
    baseURL,
    withCredentials: true
})

export const getProfile = async() => {
    const {
        data: {
            user
        }
    } = await authService.get('/profile')
    return user
}