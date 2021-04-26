import axios from 'axios'
import {
    ADD_USER_PRONOGEEKS,
    ADD_GEEK_MATCHWEEK_PRONOGEEKS,
    ADD_GEEKS_FIXTURE_PRONOGEEKS,
} from '../types/pronogeekTypes'
import {
    updateMatchweekPronogeeks,
} from './helpers'
import {
    printError,
    copyReducer,
    hasMatchStarted,
} from '../../utils/helpers'
import {
    PRONOGEEK_REDUCER_KEY,
    USER_PRONOGEEKS_KEY,
    GEEKS_FIXTURE_PRONOGEEKS_KEY,
    GEEKS_MATCHWEEK_PRONOGEEKS_KEY
} from '../reducers/keys/pronogeek'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/pronogeeks` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/pronogeeks`

const pronogeekService = axios.create({
    baseURL,
    withCredentials: true
})

export const getUserMatchweekPronos = (userID, seasonID, matchweekNumber) => async(dispatch, getState) => {
    const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY)
    newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
        loading: true,
        error: false
    }

    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })

    try {
        const {
            data: {
                pronogeeks
            }
        } = await pronogeekService.get(`/geek/${userID}/season/${seasonID}/matchweek/${matchweekNumber}`)

        updateMatchweekPronogeeks({
            pronogeeks,
            seasonID,
            matchweekNumber,
            dispatch,
            getState
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY)
        newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
            loading: false,
            error: printError('fr', error, 'Erreur lors du chargement de tes pronogeeks. Recharge la page ou réessaye plus tard.')
        }
        dispatch({
            type: ADD_USER_PRONOGEEKS,
            payload: newPronogeeks
        })
    }
}

export const getGeekMatchweekPronos = (geekID, seasonID, matchweekNumber) => async(dispatch, getState) => {
    const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, GEEKS_MATCHWEEK_PRONOGEEKS_KEY)
    newPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`] = {
        loading: true,
        error: false
    }
    dispatch({
        type: ADD_GEEK_MATCHWEEK_PRONOGEEKS,
        payload: newPronogeeks
    })

    try {
        const {
            data: {
                pronogeeks
            }
        } = await pronogeekService.get(`/geek/${geekID}/season/${seasonID}/matchweek/${matchweekNumber}`)

        const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, GEEKS_MATCHWEEK_PRONOGEEKS_KEY)
        newPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`] = {}
        pronogeeks.map(pronogeek => {
            newPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`][pronogeek.fixture] = pronogeek
            return pronogeek
        })
        dispatch({
            type: ADD_GEEK_MATCHWEEK_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, GEEKS_MATCHWEEK_PRONOGEEKS_KEY)
        newPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`] = {
            loading: false,
            error: printError('fr', error, 'Erreur lors du chargement des pronogeeks. Recharge la page ou réessaye plus tard.')
        }
        dispatch({
            type: ADD_GEEK_MATCHWEEK_PRONOGEEKS,
            payload: newPronogeeks
        })
    }
}

export const getGeekleagueFixturePronos = (fixtureID, geekleagueID) => async(dispatch, getState) => {
    const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, GEEKS_FIXTURE_PRONOGEEKS_KEY)
    newPronogeeks[`${fixtureID}-${geekleagueID}`] = {
        loading: true,
        error: false
    }
    dispatch({
        type: ADD_GEEKS_FIXTURE_PRONOGEEKS,
        payload: newPronogeeks
    })

    try {
        const {
            data: {
                pronogeeks
            }
        } = await pronogeekService.get(`/${geekleagueID}/${fixtureID}`)

        const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, GEEKS_FIXTURE_PRONOGEEKS_KEY)

        if (pronogeeks) {
            newPronogeeks[`${fixtureID}-${geekleagueID}`] = pronogeeks.sort((a, b) => {
                const pronogeekA = a.geek.username.toLowerCase()
                const pronogeekB = b.geek.username.toLowerCase()
                if (pronogeekA >= pronogeekB) return 1
                else return -1
            })
        }

        dispatch({
            type: ADD_GEEKS_FIXTURE_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, GEEKS_FIXTURE_PRONOGEEKS_KEY)
        newPronogeeks[`${fixtureID}-${geekleagueID}`] = {
            loading: false,
            error: printError('fr', error, 'Erreur lors du chargement des pronos de la ligue geek. Recharge la page ou réessaye plus tard.')
        }

        dispatch({
            type: ADD_GEEKS_FIXTURE_PRONOGEEKS,
            payload: newPronogeeks
        })
    }
}

export const handleInputHomeProno = (homeProno, fixture) => (dispatch, getState) => {
    const {
        _id,
        season,
        matchweek
    } = fixture
    homeProno = parseInt(homeProno)

    const newPronogeeks = createCopyUserPronos(getState, fixture)

    const fixturePronos = newPronogeeks[`${season}-${matchweek}`][_id]

    const awayProno = fixturePronos.awayProno
    const isAwayPronoSet = parseInt(awayProno) >= 0

    const awayPronoDB = fixturePronos.awayPronoDB >= 0 ? fixturePronos.awayPronoDB : awayProno
    let homePronoDB = fixturePronos.homePronoDB
    if (!homePronoDB && homePronoDB !== 0) homePronoDB = fixturePronos.homeProno
    const isSamePronoAsInDB = awayProno === awayPronoDB && homeProno === homePronoDB

    newPronogeeks[`${season}-${matchweek}`][_id].fixture = _id
    newPronogeeks[`${season}-${matchweek}`][_id].homeProno = homeProno
    newPronogeeks[`${season}-${matchweek}`][_id].modified = isAwayPronoSet && !isSamePronoAsInDB && homeProno >= 0
    if (homePronoDB >= 0) newPronogeeks[`${season}-${matchweek}`][_id].homePronoDB = homePronoDB

    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })
}

export const handleInputAwayProno = (awayProno, fixture) => (dispatch, getState) => {
    const {
        _id,
        season,
        matchweek
    } = fixture
    awayProno = parseInt(awayProno)

    const newPronogeeks = createCopyUserPronos(getState, fixture)

    const fixturePronos = newPronogeeks[`${season}-${matchweek}`][_id]

    const homeProno = fixturePronos.homeProno
    const isHomePronoSet = parseInt(homeProno) >= 0

    const homePronoDB = fixturePronos.homePronoDB >= 0 ? fixturePronos.homePronoDB : homeProno
    let awayPronoDB = fixturePronos.awayPronoDB
    if (!awayPronoDB && awayPronoDB !== 0) awayPronoDB = fixturePronos.awayProno
    const isSamePronoAsInDB = homeProno === homePronoDB && awayProno === awayPronoDB

    newPronogeeks[`${season}-${matchweek}`][_id].fixture = _id
    newPronogeeks[`${season}-${matchweek}`][_id].awayProno = awayProno
    newPronogeeks[`${season}-${matchweek}`][_id].modified = isHomePronoSet && !isSamePronoAsInDB && awayProno >= 0
    if (awayPronoDB >= 0) newPronogeeks[`${season}-${matchweek}`][_id].awayPronoDB = awayPronoDB

    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })
}

export const savePronogeek = (homeProno, awayProno, fixture) => async(dispatch, getState) => {
    const {
        _id,
        season,
        matchweek
    } = fixture

    const newPronogeeks = createCopyUserPronos(getState, fixture)

    newPronogeeks[`${season}-${matchweek}`][_id] = {
        ...newPronogeeks[`${season}-${matchweek}`][_id],
        saving: true,
        saved: false,
        error: false
    }

    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })

    try {
        const {
            data: {
                pronogeek
            }
        } = await pronogeekService.put(`/${_id}`, {
            homeProno,
            awayProno
        })

        const newPronogeeks = createCopyUserPronos(getState, fixture)

        newPronogeeks[`${season}-${matchweek}`][_id] = {
            ...pronogeek,
            saved: true,
            saving: false,
            error: false,
            modified: false
        }

        dispatch({
            type: ADD_USER_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        const newPronogeeks = createCopyUserPronos(getState, fixture)

        newPronogeeks[`${season}-${matchweek}`][_id] = {
            ...newPronogeeks[`${season}-${matchweek}`][_id],
            error: true,
            saving: false,
            saved: false
        }
        dispatch({
            type: ADD_USER_PRONOGEEKS,
            payload: newPronogeeks
        })
    }
}

export const saveAllPronogeeks = (seasonID, matchweekNumber, fixtures) => async(dispatch, getState) => {

    const fixturesStartedIDs = fixtures
        .filter(fixture => hasMatchStarted(fixture))
        .map(({
            _id
        }) => _id)

    const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY, `${seasonID}-${matchweekNumber}`)

    if (!Object.keys(newPronogeeks[`${seasonID}-${matchweekNumber}`]).filter(key => key !== 'error' && key !== 'saving' && key !== 'saved').length) {
        newPronogeeks[`${seasonID}-${matchweekNumber}`].error = {
            type: 'warning',
            title: 'Pas de pronos',
            message: `Aucun nouveau pronogeek à enregistrer pour la journée ${matchweekNumber}.`
        }
        return dispatch({
            type: ADD_USER_PRONOGEEKS,
            payload: newPronogeeks
        })
    }

    const pronogeeksToSave = Object.values(newPronogeeks[`${seasonID}-${matchweekNumber}`])
        .filter(({
            modified,
            fixture
        }) => modified === true && !fixturesStartedIDs.includes(fixture))
        .map(({
            fixture,
            homeProno,
            awayProno
        }) => ({
            fixture,
            homeProno,
            awayProno
        }))

    if (!pronogeeksToSave.length) {
        newPronogeeks[`${seasonID}-${matchweekNumber}`].error = {
            type: 'success',
            title: 'Pronos à jour',
            message: `Tes pronogeeks de la journée ${matchweekNumber} sont déjà à jour.`
        }
        return dispatch({
            type: ADD_USER_PRONOGEEKS,
            payload: newPronogeeks
        })
    }

    newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
        ...newPronogeeks[`${seasonID}-${matchweekNumber}`],
        saving: true,
        saved: false,
        error: false
    }
    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })

    try {
        const {
            data: {
                pronogeeks
            }
        } = await pronogeekService.put(`/season/${seasonID}/matchweek/${matchweekNumber}`, {
            pronogeeksToSave
        })

        const pronogeeksSaved = {}
        pronogeeks.map(pronogeek => {
            pronogeeksSaved[pronogeek.fixture] = pronogeek
            return pronogeek
        })

        const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY, `${seasonID}-${matchweekNumber}`)
        newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
            ...newPronogeeks[`${seasonID}-${matchweekNumber}`],
            ...pronogeeksSaved,
            saved: true,
            saving: false,
            error: false
        }

        dispatch({
            type: ADD_USER_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        console.error('ERROR:', error.message)

        const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY, `${seasonID}-${matchweekNumber}`)
        newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
            ...newPronogeeks[`${seasonID}-${matchweekNumber}`],
            error: {
                type: 'error',
                title: 'Erreur',
                message: `Une erreur a eu lieu lors de l'enregistrement de tes pronogeeks de la journée ${matchweekNumber}. Tente de les enregistrer un par un ou réessaye plus tard.`,
            },
            saved: false,
            saving: false,
        }

        dispatch({
            type: ADD_USER_PRONOGEEKS,
            payload: newPronogeeks
        })
    }
}

export const resetSaveAndErrorState = fixture => (dispatch, getState) => {
    const {
        _id,
        season,
        matchweek
    } = fixture

    const newPronogeeks = createCopyUserPronos(getState, fixture)

    newPronogeeks[`${season}-${matchweek}`][_id] = {
        ...newPronogeeks[`${season}-${matchweek}`][_id],
        saving: false,
        saved: false,
        error: false
    }
    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })
}

export const resetMatchweekSaveAndErrorState = (seasonID, matchweekNumber) => (dispatch, getState) => {

    const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY)

    newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
        ...newPronogeeks[`${seasonID}-${matchweekNumber}`],
        saving: false,
        saved: false,
        error: false
    }
    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })
}

function createCopyUserPronos(getState, fixture) {
    const {
        _id,
        season,
        matchweek
    } = fixture

    const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY, `${season}-${matchweek}`, _id)

    return newPronogeeks
}