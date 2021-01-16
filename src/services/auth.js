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
    const {
        data
    } = await authService.post('/login', userData)
    console.log(data);
    return await getProfile()
}

export const facebookLogin = async() => {
    return await authService.get('/facebook')
}

export const googleLogin = async() => {
    return await authService.get('/google')
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