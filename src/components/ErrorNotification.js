import { useEffect } from 'react'
import { connect } from 'react-redux'
import { openNotification } from '../helpers'

import { resetAuthError } from '../actions/authActions'
import { resetGeekError } from '../actions/geekActions'
import { resetGeekleagueError } from '../actions/geekleagueActions'
import { resetApiFootballError } from '../actions/apiFootballActions'

const ErrorNotification = (props) => {

    const types = ['auth', 'geek', 'geekleague', 'apiFootball']

    const errors = {
        auth: props.authError,
        geek: props.geekError,
        geekleague: props.geekleagueError,
        apiFootball: props.apiFootballError
    }

    const resets = {
        auth: props.resetAuthError,
        geek: props.resetGeekError,
        geekleague: props.resetGeekleagueError,
        apiFootball: props.resetApiFootballError
    }

    useEffect(() => {
        for (let type of types) {
            if (errors[type]) {
                openNotification('error', 'Erreur', errors[type])
                resets[type]()
            }
        }
    }, [props, errors, resets, types])

    return null
}

const mapStateToProps = state => ({
    authError: state.authReducer.error,
    geekError: state.geekReducer.error,
    geekleagueError: state.geekleagueReducer.error,
    apiFootballError: state.apiFootballReducer.error,
})

const mapDispatchToProps = {
    resetAuthError,
    resetGeekError,
    resetGeekleagueError,
    resetApiFootballError
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
