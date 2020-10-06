import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/fetch` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/fetch`

const apiFootballService = axios.create({
    baseURL,
    withCredentials: true
})

export const updateFixturesStatus = async(seasonID, matchweekNum) => {
    const {
        data
    } = await apiFootballService.get(`/fixtures/season/${seasonID}/matchweek/${matchweekNum}`)
    return data
}

export const updateOdds = async(seasonID, matchweekNum) => {
    const {
        data: {
            message
        }
    } = await apiFootballService.get(`/odds/season/${seasonID}/matchweek/${matchweekNum}`)
    return message
}