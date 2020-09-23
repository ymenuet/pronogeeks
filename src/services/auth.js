import axios from 'axios'

const baseURL = `http://localhost:3000/auth`
const authService = axios.create({
    baseURL,
    withCredentials: true
})

export const signup = async user => {
    const {
        data
    } = await authService.post('/signup', user)
    return data
}

export const login = async userData => {
    const {
        data
    } = await authService.post('/login', userData)
    return data
}