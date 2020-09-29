import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/fixtures` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/fixtures`

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