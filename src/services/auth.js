import axios from 'axios'

const baseURL = `http://localhost:3000/auth`
const authService = axios.create({
    baseURL,
    withCredentials: true
})

export const signup = async user => {
    await authService.post('/signup', user)
    return true
}

export const login = async userData => {
    const {
        data
    } = await authService.post('/login', userData)
    return data
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