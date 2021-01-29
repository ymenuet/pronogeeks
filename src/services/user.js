import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/geek` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/geek`

const geekService = axios.create({
    baseURL,
    withCredentials: true
})

export const updateProfileWithSeason = async seasonID => {
    const {
        data: {
            newSeason
        }
    } = await geekService.get(`/season/${seasonID}`)
    return newSeason
}

export const updateProfileWithMatchweek = async(seasonID, matchweekNumber) => {
    const {
        data: {
            matchweek
        }
    } = await geekService.put(`/season/${seasonID}/matchweek/${matchweekNumber}`)
    return matchweek
}

export const fetchPlayers = async(seasonID) => {
    const {
        data: {
            geeks
        }
    } = await geekService.get(`/players/${seasonID}`)
    return geeks
}

export const saveGeekLeagueHistory = async(userID, geekLeagueID) => {
    await geekService.put(`/geekLeagueHistory/${userID}/${geekLeagueID}`)
    return true
}

export const saveUserProvRanking = async(seasonID, userProvRanking) => {
    await geekService.put(`/provisionalRanking/${seasonID}`, {
        userProvRanking
    })
    return true
}