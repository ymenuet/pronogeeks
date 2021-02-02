import axios from 'axios'
import {
    ADD_PRONOGEEKS,
    ADD_GEEK_PRONOGEEKS,
    LOADING,
    ERROR
} from '../types/pronogeekTypes'

const baseURL = process.env.NODE_ENV === 'production' ?
    `/api/pronogeeks` :
    `${process.env.REACT_APP_BACKENDPOINT}/api/pronogeeks`

const pronogeekService = axios.create({
    baseURL,
    withCredentials: true
})

export const getUserMatchweekPronos = (userID, seasonID, matchweekNumber) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                pronogeeks
            }
        } = await pronogeekService.get(`/geek/${userID}/season/${seasonID}/matchweek/${matchweekNumber}`)

        const {
            userPronogeeks
        } = getState().pronogeekReducer

        const newPronogeeks = {
            ...userPronogeeks
        }
        newPronogeeks[`${seasonID}-${matchweekNumber}`] = {}
        pronogeeks.map(pronogeek => {
            newPronogeeks[`${seasonID}-${matchweekNumber}`][pronogeek.fixture] = pronogeek
            return pronogeek
        })
        dispatch({
            type: ADD_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Erreur lors du chargement des pronogeeks. Recharge la page ou réessaye plus tard.'
        })
    }
}

export const getGeekMatchweekPronos = (geekID, seasonID, matchweekNumber) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {
        const {
            data: {
                pronogeeks
            }
        } = await pronogeekService.get(`/geek/${geekID}/season/${seasonID}/matchweek/${matchweekNumber}`)

        const {
            geeksPronogeeks
        } = getState().pronogeekReducer

        const newPronogeeks = {
            ...geeksPronogeeks
        }
        newPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`] = {}
        pronogeeks.map(pronogeek => {
            newPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`][pronogeek.fixture] = pronogeek
            return pronogeek
        })
        dispatch({
            type: ADD_GEEK_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Erreur lors du chargement des pronogeeks. Recharge la page ou réessaye plus tard.'
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

    const awayProno = newPronogeeks[`${season}-${matchweek}`][_id].awayProno
    const isAwayPronoSet = parseInt(awayProno) >= 0

    const awayPronoDB = newPronogeeks[`${season}-${matchweek}`][_id].awayPronoDB || awayProno
    let homePronoDB = newPronogeeks[`${season}-${matchweek}`][_id].homePronoDB
    if (!newPronogeeks[`${season}-${matchweek}`][_id].modified) homePronoDB = newPronogeeks[`${season}-${matchweek}`][_id].homeProno
    const isSamePronoAsInDB = awayProno === awayPronoDB && homeProno === homePronoDB

    newPronogeeks[`${season}-${matchweek}`][_id].fixture = _id
    newPronogeeks[`${season}-${matchweek}`][_id].homeProno = homeProno
    newPronogeeks[`${season}-${matchweek}`][_id].modified = isAwayPronoSet && !isSamePronoAsInDB && homeProno >= 0
    if (homePronoDB) newPronogeeks[`${season}-${matchweek}`][_id].homePronoDB = homePronoDB

    dispatch({
        type: ADD_PRONOGEEKS,
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

    const homeProno = newPronogeeks[`${season}-${matchweek}`][_id].homeProno
    const isHomePronoSet = parseInt(newPronogeeks[`${season}-${matchweek}`][_id].homeProno) >= 0

    const homePronoDB = newPronogeeks[`${season}-${matchweek}`][_id].homePronoDB || homeProno
    let awayPronoDB = newPronogeeks[`${season}-${matchweek}`][_id].awayPronoDB
    if (!newPronogeeks[`${season}-${matchweek}`][_id].modified) awayPronoDB = newPronogeeks[`${season}-${matchweek}`][_id].awayProno
    const isSamePronoAsInDB = homeProno === homePronoDB && awayProno === awayPronoDB

    newPronogeeks[`${season}-${matchweek}`][_id].fixture = _id
    newPronogeeks[`${season}-${matchweek}`][_id].awayProno = awayProno
    newPronogeeks[`${season}-${matchweek}`][_id].modified = isHomePronoSet && !isSamePronoAsInDB && awayProno >= 0
    if (awayPronoDB) newPronogeeks[`${season}-${matchweek}`][_id].awayPronoDB = awayPronoDB

    dispatch({
        type: ADD_PRONOGEEKS,
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
        type: ADD_PRONOGEEKS,
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
            type: ADD_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        const newPronogeeks = createCopyUserPronos(getState, fixture)

        newPronogeeks[`${season}-${matchweek}`][_id] = {
            ...newPronogeeks[`${season}-${matchweek}`][_id],
            error: true,
            saving: false,
            saved: false
        }
        dispatch({
            type: ADD_PRONOGEEKS,
            payload: newPronogeeks
        })
    }
}

export const saveAllPronogeeks = (seasonID, matchweekNumber) => async(dispatch, getState) => {
    const {
        userPronogeeks
    } = getState().pronogeekReducer

    const newPronogeeks = {
        ...userPronogeeks
    }
    newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
        ...userPronogeeks[`${seasonID}-${matchweekNumber}`],
    }

    if (!Object.keys(userPronogeeks[`${seasonID}-${matchweekNumber}`]).filter(key => key !== 'error' && key !== 'saving' && key !== 'saved').length) {
        newPronogeeks[`${seasonID}-${matchweekNumber}`].error = {
            type: 'warning',
            title: 'Pas de pronos',
            message: `Aucun nouveau pronogeek à enregistrer pour la journée ${matchweekNumber}.`
        }
        return dispatch({
            type: ADD_PRONOGEEKS,
            payload: newPronogeeks
        })
    }

    const pronogeeksToSave = Object.values(userPronogeeks[`${seasonID}-${matchweekNumber}`])
        .filter(({
            modified
        }) => modified === true)
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
            type: ADD_PRONOGEEKS,
            payload: newPronogeeks
        })
    }

    newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
        ...userPronogeeks[`${seasonID}-${matchweekNumber}`],
        saving: true,
        saved: false,
        error: false
    }

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

        const newPronogeeks = {
            ...userPronogeeks
        }
        newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
            ...userPronogeeks[`${seasonID}-${matchweekNumber}`],
            ...pronogeeksSaved,
            saved: true,
            saving: false,
            error: false
        }

        dispatch({
            type: ADD_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        const newPronogeeks = {
            ...userPronogeeks
        }
        newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
            ...userPronogeeks[`${seasonID}-${matchweekNumber}`],
            error: {
                type: 'error',
                title: 'Erreur',
                message: `Une erreur a eu lieu lors de l'enregistrement de tes pronogeeks de la journée ${matchweekNumber}. Tente de les enregistrer un par un ou réessaye plus tard.`,
            },
            saved: false,
            saving: false,
        }

        dispatch({
            type: ADD_PRONOGEEKS,
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
        type: ADD_PRONOGEEKS,
        payload: newPronogeeks
    })
}

export const resetMatchweekSaveAndErrorState = (seasonID, matchweekNumber) => (dispatch, getState) => {
    const {
        userPronogeeks
    } = getState().pronogeekReducer

    const newPronogeeks = {
        ...userPronogeeks
    }

    newPronogeeks[`${seasonID}-${matchweekNumber}`] = {
        ...userPronogeeks[`${seasonID}-${matchweekNumber}`],
        saving: false,
        saved: false,
        error: false
    }
    dispatch({
        type: ADD_PRONOGEEKS,
        payload: newPronogeeks
    })
}

function createCopyUserPronos(getState, fixture) {
    const {
        _id,
        season,
        matchweek
    } = fixture

    const {
        userPronogeeks
    } = getState().pronogeekReducer
    const newPronogeeks = {
        ...userPronogeeks
    }

    if (userPronogeeks[`${season}-${matchweek}`]) {
        newPronogeeks[`${season}-${matchweek}`] = {
            ...userPronogeeks[`${season}-${matchweek}`]
        }
        if (userPronogeeks[`${season}-${matchweek}`][_id]) {
            newPronogeeks[`${season}-${matchweek}`][_id] = {
                ...userPronogeeks[`${season}-${matchweek}`][_id],
            }
        } else {
            newPronogeeks[`${season}-${matchweek}`][_id] = {}
        }
    } else {
        newPronogeeks[`${season}-${matchweek}`] = {}
        newPronogeeks[`${season}-${matchweek}`][_id] = {}
    }

    return newPronogeeks
}