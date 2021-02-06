import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/geekLeagues` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/geekLeagues`

const geekleagueService = axios.create({
    baseURL,
    withCredentials: true
})

export const getUserLeagues = async() => {
    const {
        data: {
            geekLeagues
        }
    } = await geekleagueService.get('/')
    return geekLeagues
}

export const editGeekLeague = async(geekLeagueID, name, geeks) => {
    const {
        data: {
            geekLeague
        }
    } = await geekleagueService.put(`/${geekLeagueID}`, {
        name,
        geeks
    })
    return geekLeague
}

export const outGeekLeague = async(geekLeagueID) => {
    await geekleagueService.get(`out/${geekLeagueID}`)
    return true
}

export const deleteGeekLeague = async geekLeagueID => {
    await geekleagueService.delete(`/${geekLeagueID}`)
    return true
}