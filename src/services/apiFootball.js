import axios from 'axios'

const baseURL = `http://localhost:3000/api/fetch`
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