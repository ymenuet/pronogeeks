import {
    ADD_MATCHWEEK
} from './reduxTypes/seasonTypes'
import {
    ADD_USER_PRONOGEEKS
} from './reduxTypes/pronogeekTypes'
import {
    SEASON_REDUCER_KEY,
    SEASON_MATCHWEEKS_KEY
} from '../utils/reducerKeys/season'
import {
    PRONOGEEK_REDUCER_KEY,
    USER_PRONOGEEKS_KEY
} from '../utils/reducerKeys/pronogeek'
import {
    copyReducer,
    isMatchFinished,
} from './helpers'

export const updateMatchweekFixtures = ({
    fixtures,
    seasonID,
    matchweekNumber,
    dispatch,
    getState,
}) => {
    const matchweekFixtures = fixtures
        .filter(fixture => `${fixture.matchweek}` === `${matchweekNumber}`)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const totalGames = matchweekFixtures.length
    const gamesFinished = matchweekFixtures.filter(fixture => isMatchFinished(fixture.statusShort)).length
    const hasStarted = new Date(matchweekFixtures[0].date).getTime() <= Date.now()

    const newMatchweeks = copyReducer(getState, SEASON_REDUCER_KEY, SEASON_MATCHWEEKS_KEY)
    newMatchweeks[`${seasonID}-${matchweekNumber}`] = {
        totalGames,
        gamesFinished,
        hasStarted,
        fixtures: matchweekFixtures
    }

    dispatch({
        type: ADD_MATCHWEEK,
        payload: newMatchweeks
    })
}

export const updateMatchweekPronogeeks = ({
    pronogeeks,
    seasonID,
    matchweekNumber,
    dispatch,
    getState
}) => {

    const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY)
    newPronogeeks[`${seasonID}-${matchweekNumber}`] = {}

    for (let pronogeek of pronogeeks) {
        newPronogeeks[`${seasonID}-${matchweekNumber}`][pronogeek.fixture] = pronogeek
    }

    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })
}