import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/seasons` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/seasons`

const seasonService = axios.create({
    baseURL,
    withCredentials: true
})

export const getSeasons = async() => {
    const {
        data: {
            seasons
        }
    } = await seasonService.get('/')
    return seasons
}