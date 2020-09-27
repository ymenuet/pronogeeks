import axios from 'axios'

const baseURL = `http://localhost:3000/api/user`
const userService = axios.create({
    baseURL,
    withCredentials: true
})

export const updateProfileWithSeason = async seasonID => {
    const {
        data: {
            newSeason
        }
    } = await userService.get(`/${seasonID}`)
    return newSeason
}

export const updateProfileWithMatchweek = async(seasonID, matchweekNumber) => {
    const {
        data: {
            matchweek
        }
    } = await userService.get(`/${seasonID}/${matchweekNumber}`)
    return matchweek
}

export const updateFavTeam = async(seasonID, favTeam) => {
    await userService.put(`/${seasonID}/favTeam`, favTeam)
    return true
}