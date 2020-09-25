import axios from 'axios'

const baseURL = `http://localhost:3000/api/pronogeeks`
const pronogeekService = axios.create({
    baseURL,
    withCredentials: true
})

export const savePronogeeks = async(homeScore, awayScore, fixtureID) => {
    const {
        data: {
            pronogeek: pronogeekExists
        }
    } = await pronogeekService.get(`/${fixtureID}`)
    if (!pronogeekExists) {
        const {
            data: {
                pronogeek
            }
        } = await pronogeekService.post(`/${fixtureID}`, {
            homeProno: homeScore,
            awayProno: awayScore
        })
        return pronogeek
    } else {
        const {
            data: {
                pronogeek
            }
        } = await pronogeekService.put(`/${pronogeekExists._id}`, {
            homeProno: homeScore,
            awayProno: awayScore
        })
        return pronogeek
    }
}