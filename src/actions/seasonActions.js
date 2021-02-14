import axios from 'axios'
import {
    GET_UNDERGOING_SEASONS,
    ADD_SEASON,
    SET_NEXT_MATCHWEEK,
    SET_LAST_MATCHWEEK,
    LOADING,
    ERROR
} from '../types/seasonTypes'
import {
    updateMatchweekFixtures,
    copyReducer,
    printError
} from '../helpers'
import {
    seasonReducer,
    detailedSeasons,
    nextMatchweeks,
    lastMatchweeks
} from '../reducerKeys/season'
import {
    MILLISECONDS_IN_3_HOURS
} from '../constants'


const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/seasons` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/seasons`

const seasonService = axios.create({
    baseURL,
    withCredentials: true
})

export const getSeason = seasonID => async(dispatch, getState) => {
    const newDetailedSeasons = copyReducer(getState, seasonReducer, detailedSeasons)
    newDetailedSeasons[seasonID] = {
        loading: true,
        error: false
    }

    dispatch({
        type: ADD_SEASON,
        payload: newDetailedSeasons
    })

    try {
        const {
            data: {
                season
            }
        } = await seasonService.get(`/${seasonID}`)

        const newDetailedSeasons = copyReducer(getState, seasonReducer, detailedSeasons)
        newDetailedSeasons[seasonID] = season

        dispatch({
            type: ADD_SEASON,
            payload: newDetailedSeasons
        })
    } catch (error) {
        console.error('ERROR:', error.message)

        const newDetailedSeasons = copyReducer(getState, seasonReducer, detailedSeasons)
        newDetailedSeasons[seasonID] = {
            loading: false,
            error: printError('fr', error, 'Erreur lors du chargement des données de la saison. Recharge la page ou réessaye plus tard.')
        }

        dispatch({
            type: ADD_SEASON,
            payload: newDetailedSeasons
        })
    }
}

export const getMatchweekFixtures = (season, matchweekNumber) => (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {
        _id,
        fixtures
    } = season

    updateMatchweekFixtures({
        fixtures,
        matchweekNumber,
        dispatch,
        getState,
        seasonID: _id,
    })
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

    const newMatchweeks = copyReducer(getState, seasonReducer, nextMatchweeks)
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

    const newMatchweeks = copyReducer(getState, seasonReducer, lastMatchweeks)
    newMatchweeks[_id] = lastMatchweek

    dispatch({
        type: SET_LAST_MATCHWEEK,
        payload: newMatchweeks
    })
}

export const closeProvRankings = seasonID => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        await seasonService.put(`/closeRankings/${seasonID}`)

        const newDetailedSeasons = copyReducer(getState, seasonReducer, detailedSeasons, seasonID)
        newDetailedSeasons[seasonID].provRankingOpen = false

        dispatch({
            type: ADD_SEASON,
            payload: newDetailedSeasons
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de la fermeture du classement de la saison.`)
        })
    }
}

export const getUndergoingSeasons = () => async dispatch => {
    dispatch({
        type: GET_UNDERGOING_SEASONS,
        payload: {
            loading: true,
            error: false
        }
    })

    try {
        const {
            data: {
                seasons
            }
        } = await seasonService.get('/current')

        const undergoingSeasons = {}
        for (let season of seasons) {
            undergoingSeasons[season._id] = season
        }

        dispatch({
            type: GET_UNDERGOING_SEASONS,
            payload: undergoingSeasons
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        dispatch({
            type: GET_UNDERGOING_SEASONS,
            payload: {
                loading: false,
                error: printError('fr', error, `Erreur lors du chargement des saisons. Recharge la page ou réessaye plus tard.`)
            }
        })
    }
}

function getLastMatchweek(fixtures) {
    return fixtures.map(fixture => fixture.matchweek).reduce((lastMatchweek, matchweek) => matchweek > lastMatchweek ? matchweek : lastMatchweek)
}