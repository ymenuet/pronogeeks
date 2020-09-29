import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/geekLeagues` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/geekLeagues`

const geekLeagueService = axios.create({
    baseURL,
    withCredentials: true
})

export const createLeague = async values => {
    const {
        data: {
            geekLeague
        }
    } = await geekLeagueService.post('/', values)
    return geekLeague
}

export const fetchLeague = async leagueID => {
    const {
        data: {
            geekLeague
        }
    } = await geekLeagueService.get(`/${leagueID}`)
    return geekLeague
}

export const getUserLeagues = async() => {
    const {
        data: {
            geekLeagues
        }
    } = await geekLeagueService.get('/')
    return geekLeagues
}