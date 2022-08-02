import axios from 'axios'
import {
    GET_UNDERGOING_SEASONS,
    GET_SEASONS_FOR_NEW_GEEKLEAGUE,
    GET_SEASON_MENU_ITEM,
    ADD_SEASON,
    SET_NEXT_MATCHWEEK,
    SET_LAST_MATCHWEEK,
    CLOSE_SEASON,
    SEASON_TARGETED_RESET,
    LOADING,
    ERROR
} from '../types/seasonTypes'
import {
    updateMatchweekFixtures,
    targetedResetActionCreator,
} from './helpers'
import {
    printError,
    copyReducer,
} from '../../utils/helpers'
import {
    SEASON_REDUCER_KEY,
    DETAILED_SEASONS_KEY,
    NEXT_MATCHWEEKS_KEY,
    LAST_MATCHWEEKS_KEY
} from '../reducers/keys/season'
import {
    MILLISECONDS_IN_3_HOURS
} from '../../utils/constants.js'


const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/seasons` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/seasons`

const seasonService = axios.create({
    baseURL,
    withCredentials: true
})

export const getSeason = seasonID => async(dispatch, getState) => {
    const newDetailedSeasons = copyReducer(getState, SEASON_REDUCER_KEY, DETAILED_SEASONS_KEY)
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

        const newDetailedSeasons = copyReducer(getState, SEASON_REDUCER_KEY, DETAILED_SEASONS_KEY)
        newDetailedSeasons[seasonID] = season

        dispatch({
            type: ADD_SEASON,
            payload: newDetailedSeasons
        })
    } catch (error) {
        console.error('ERROR:', error.message)

        const newDetailedSeasons = copyReducer(getState, SEASON_REDUCER_KEY, DETAILED_SEASONS_KEY)
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

export const getSeasonMenuItem = () => async(dispatch) => {
    try {
        const {
            data: {
                seasonMenuItem
            }
        } = await seasonService.get(`/menuItem`)

        dispatch({
            type: GET_SEASON_MENU_ITEM,
            payload: seasonMenuItem
        })
    } catch (error) {
        console.error('ERROR:', error.message)
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

    const newMatchweeks = copyReducer(getState, SEASON_REDUCER_KEY, NEXT_MATCHWEEKS_KEY)
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

    const newMatchweeks = copyReducer(getState, SEASON_REDUCER_KEY, LAST_MATCHWEEKS_KEY)
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

        const newDetailedSeasons = copyReducer(getState, SEASON_REDUCER_KEY, DETAILED_SEASONS_KEY, seasonID)
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

        if (!seasons.length) undergoingSeasons.empty = true

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

export const getUpcomingAndUndergoingSeasons = () => async dispatch => {
    dispatch({
        type: GET_SEASONS_FOR_NEW_GEEKLEAGUE,
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
        } = await seasonService.get('/futureAndCurrent')

        const upcomingAndUndergoingSeasons = {}
        for (let season of seasons) {
            upcomingAndUndergoingSeasons[season._id] = season
        }

        if (!seasons.length) upcomingAndUndergoingSeasons.empty = true

        dispatch({
            type: GET_SEASONS_FOR_NEW_GEEKLEAGUE,
            payload: upcomingAndUndergoingSeasons
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        dispatch({
            type: GET_SEASONS_FOR_NEW_GEEKLEAGUE,
            payload: {
                loading: false,
                error: printError('fr', error, `Erreur lors du chargement des saisons. Recharge la page ou réessaye plus tard.`)
            }
        })
    }
}

export const closeSeason = (seasonID) => async dispatch => {
    dispatch({
        type: LOADING
    })

    try {
        await seasonService.get(`/closeSeason/${seasonID}`)

        dispatch({
            type: CLOSE_SEASON,
            payload: seasonID
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        dispatch({
            type: ERROR,
            payload: printError('fr', error, `Erreur lors de la fermeture de la saison.`)
        })
    }
}

export const targetedResetSeasons = (statesToReset, resetValue) => dispatch => {
    targetedResetActionCreator({
        statesToReset,
        resetValue,
        dispatch,
        type: SEASON_TARGETED_RESET
    })
}

function getLastMatchweek(fixtures) {
    return fixtures.map(fixture => fixture.matchweek).reduce((lastMatchweek, matchweek) => matchweek > lastMatchweek ? matchweek : lastMatchweek)
}