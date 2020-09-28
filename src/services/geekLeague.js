import axios from 'axios'

const baseURL = `${process.env.REACT_APP_BACKENDPOINT}/api/geekLeagues`
const geekLeagueService = axios.create({
    baseURL,
    withCredentials: true
})

export const createLeague = async(values) => {

}