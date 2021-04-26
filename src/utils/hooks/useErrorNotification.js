import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openNotification } from '../helpers'

import { resetAuthError } from '../../state/actions/authActions'
import { resetGeekError } from '../../state/actions/geekActions'
import { resetGeekleagueError } from '../../state/actions/geekleagueActions'
import { resetApiFootballError } from '../../state/actions/apiFootballActions'

export const useErrorNotification = () => {
    const dispatch = useDispatch()

    const errors = useSelector(state => ({
        auth: state.authReducer.error,
        geek: state.geekReducer.error,
        geekleague: state.geekleagueReducer.error,
        apiFootball: state.apiFootballReducer.error,
    }))

    const resets = {
        auth: resetAuthError,
        geek: resetGeekError,
        geekleague: resetGeekleagueError,
        apiFootball: resetApiFootballError
    }

    const types = ['auth', 'geek', 'geekleague', 'apiFootball']

    useEffect(() => {
        for (let type of types) {
            if (errors[type]) {
                openNotification('error', 'Erreur', errors[type])
                dispatch(resets[type]())
            }
        }
    }, [errors, resets, types, dispatch])
}