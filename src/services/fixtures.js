import axios from 'axios'

const baseURL = `http://localhost:3000/api/fixtures`
const fixtureService = axios.create({
    baseURL,
    withCredentials: true
})

export const getFixture = async fixtureID => {
    const {
        data: {
            fixture
        }
    } = await fixtureService.get(`/${fixtureID}`)
    return fixture
}