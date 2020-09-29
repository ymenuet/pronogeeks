import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/auth` :
    `${process.env.REACT_APP_BACKENDPOINT}/auth`

const authService = axios.create({
    baseURL,
    withCredentials: true
})

export const signup = async user => {
    await authService.post('/signup', user)
    return true
}

export const login = async userData => {
    await authService.post('/login', userData)
    return getProfile()
}

export const updateProfile = async(userData) => {
    await authService.put('/edit', userData)
    return getProfile()
}

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

export const logout = async() => {
    const {
        data
    } = await authService.get('/logout')
    return data
}