import axios from 'axios'
import {
    ADD_SEASON,
    SET_NEXT_MATCHWEEK,
    SET_LAST_MATCHWEEK,
    LOADING,
    ERROR
} from '../types/seasonTypes'

const MILLISECONDS_IN_3_HOURS = 1000 * 60 * 60 * 3

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/seasons` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/seasons`

const seasonService = axios.create({
    baseURL,
    withCredentials: true
})

export const getSeason = seasonID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                season
            }
        } = await seasonService.get(`/${seasonID}`)

        const {
            detailedSeasons
        } = getState().seasonReducer
        const newDetailedSeasons = {
            ...detailedSeasons
        }
        newDetailedSeasons[season._id] = season

        dispatch({
            type: ADD_SEASON,
            payload: newDetailedSeasons
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Erreur lors du chargement des données de la saison. Recharge la page ou réessaye plus tard.'
        })
    }
}

export const setNextMatchweek = season => (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {
        _id,
        fixtures
    } = season
    let nextMatchweek

    const fixturesToCome = fixtures.filter(fixture => new Date(fixture.date).getTime() > (Date.now() - MILLISECONDS_IN_3_HOURS))

    if (fixturesToCome.length) {
        const nextFixture = fixturesToCome.reduce((earliestFixture, fixture) => {
            if (fixture.date < earliestFixture.date) return fixture
            else return earliestFixture
        })
        nextMatchweek = nextFixture.matchweek
    } else {
        nextMatchweek = getLastMatchweek(fixtures)
    }

    const {
        nextMatchweeks,
    } = getState().seasonReducer
    const newMatchweeks = {
        ...nextMatchweeks
    }
    newMatchweeks[_id] = nextMatchweek

    dispatch({
        type: SET_NEXT_MATCHWEEK,
        payload: newMatchweeks
    })
}

export const setLastMatchweek = season => (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {
        _id,
        fixtures
    } = season
    let lastMatchweek

    const lastFixtures = fixtures.filter(fixture => new Date(fixture.date).getTime() < Date.now())
    if (lastFixtures.length) lastMatchweek = getLastMatchweek(lastFixtures)
    else lastMatchweek = 1

    const {
        lastMatchweeks,
    } = getState().seasonReducer
    const newMatchweeks = {
        ...lastMatchweeks
    }
    newMatchweeks[_id] = lastMatchweek

    dispatch({
        type: SET_LAST_MATCHWEEK,
        payload: newMatchweeks
    })
}

function getLastMatchweek(fixtures) {
    return fixtures.map(fixture => fixture.matchweek).reduce((lastMatchweek, matchweek) => matchweek > lastMatchweek ? matchweek : lastMatchweek)
}