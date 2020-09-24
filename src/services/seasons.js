import axios from 'axios'

const baseURL = `http://localhost:3000/api/seasons`
const seasonService = axios.create({
    baseURL,
    withCredentials: true
})

export const getAllFixtures = async(seasonID) => {
    const {
        data: {
            season
        }
    } = await seasonService.get(`/${seasonID}`)
    return season
}

export const getMatchweekFixtures = async(seasonID, matchweekNum) => {
    const {
        data: {
            fixtures
        }
    } = await seasonService.get(`/${seasonID}/${matchweekNum}`)
    return fixtures
}