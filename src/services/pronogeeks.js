import axios from 'axios'

const baseURL = `http://localhost:3000/api/pronogeeks`
const pronogeekService = axios.create({
    baseURL,
    withCredentials: true
})

export const savePronogeeks = async(homeScore, awayScore, fixtureID) => {
    //TODO: server-side controllers for POST and PUT pronogeeks
}