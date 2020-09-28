import axios from 'axios'

const baseURL = `${process.env.REACT_APP_BACKENDPOINT}/api/user`
const userService = axios.create({
    baseURL,
    withCredentials: true
})

export const getUsers = async() => {
    const {
        data: {
            users
        }
    } = await userService.get('/users')
    return users
}

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

export const fetchPlayers = async(seasonID) => {
    const {
        data: {
            users
        }
    } = await userService.get(`/players/${seasonID}`)
    return users
}