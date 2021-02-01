import axios from 'axios'
import {
    ADD_PRONOGEEKS,
    ADD_GEEK_PRONOGEEKS,
    SAVING_ALL,
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

    const newPronogeeks = createCopyMatchweekPronos(getState, fixture)

    newPronogeeks[`${season}-${matchweek}`].modified[_id] = true

    newPronogeeks[`${season}-${matchweek}`][_id] = {
        ...newPronogeeks[`${season}-${matchweek}`][_id],
        homeProno
    }

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

    const newPronogeeks = createCopyMatchweekPronos(getState, fixture)

    newPronogeeks[`${season}-${matchweek}`].modified[_id] = true

    newPronogeeks[`${season}-${matchweek}`][_id] = {
        ...newPronogeeks[`${season}-${matchweek}`][_id],
        awayProno
    }

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

    const newPronogeeks = createCopyMatchweekPronos(getState, fixture)

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

        const newPronogeeks = createCopyMatchweekPronos(getState, fixture)

        newPronogeeks[`${season}-${matchweek}`].modified[_id] = false

        newPronogeeks[`${season}-${matchweek}`][_id] = {
            ...pronogeek,
            saved: true,
            saving: false,
            error: false
        }

        dispatch({
            type: ADD_PRONOGEEKS,
            payload: newPronogeeks
        })

    } catch (error) {
        const newPronogeeks = createCopyMatchweekPronos(getState, fixture)

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
    dispatch({
        type: SAVING_ALL
    })

    const {
        userPronogeeks
    } = getState().pronogeekReducer

    if (!userPronogeeks[`${seasonID}-${matchweekNumber}`]) return dispatch({
        type: ERROR,
        payload: `Auncun pronogeek à enregistrer`
    })

    try {
        console.log(userPronogeeks[`${seasonID}-${matchweekNumber}`])

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Erreur lors de la sauvegarde des pronos. Réessaye plus tard ou tente de les enregistrer un par un.`
        })
    }
}

export const resetSaveAndErrorState = fixture => (dispatch, getState) => {
    const {
        _id,
        season,
        matchweek
    } = fixture

    const newPronogeeks = createCopyMatchweekPronos(getState, fixture)

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

function createCopyMatchweekPronos(getState, fixture) {
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
        if (userPronogeeks[`${season}-${matchweek}`].modified) {
            newPronogeeks[`${season}-${matchweek}`].modified = {
                ...userPronogeeks[`${season}-${matchweek}`].modified,
            }
        } else {
            newPronogeeks[`${season}-${matchweek}`].modified = {}
        }
    } else {
        newPronogeeks[`${season}-${matchweek}`] = {
            modified: {}
        }
        newPronogeeks[`${season}-${matchweek}`][_id] = {}
    }

    return newPronogeeks
}