import axios from 'axios'

const baseURL = `http://localhost:3000/api/fetch`
const apiFootballService = axios.create({
    baseURL,
    withCredentials: true
})

export const updateFixturesStatus = async(seasonID, matchweekNum) => {
    const {
        data: {
            fixtures
        }
    } = await apiFootballService.get(`/fixtures/season/${seasonID}/matchweek/${matchweekNum}`)
    return fixtures
}

export const updateOdds = async(seasonID, matchweekNum) => {
    await apiFootballService.get(`/odds/season/${seasonID}/matchweek/${matchweekNum}`)
    return true
}