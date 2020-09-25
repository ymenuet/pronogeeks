import axios from 'axios'

const baseURL = `http://localhost:3000/api/user`
const userService = axios.create({
    baseURL,
    withCredentials: true
})

export const updateProfileWithSeason = async seasonID => {
    const {
        data: {
            season
        }
    } = await userService.get(`/${seasonID}`)
    return season
}

export const updateProfileWithMatchweek = async(seasonID, matchweekNumber) => {
    const {
        data: {
            matchweek
        }
    } = await userService.get(`/${seasonID}/${matchweekNumber}`)
    return matchweek
}