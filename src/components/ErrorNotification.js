import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { openNotification } from '../helpers'

import { resetAuthError } from '../actions/authActions'
import { resetGeekError } from '../actions/geekActions'
import { resetGeekleagueError } from '../actions/geekleagueActions'

const ErrorNotification = (props) => {

    const { types } = props

    const errors = {
        auth: props.authError,
        geek: props.geekError,
        geekleague: props.geekleagueError
    }

    const resets = {
        auth: props.resetAuthError,
        geek: props.resetGeekError,
        geekleague: props.resetGeekleagueError
    }

    useEffect(() => {
        for (let type of types) {
            if (errors[type]) {
                openNotification('error', errors[type])
                resets[type]()
            }
        }
    }, [props, errors, resets, types])

    return <div></div>
}

const mapStateToProps = state => ({
    authError: state.authReducer.error,
    geekError: state.geekReducer.error,
    geekleagueError: state.geekleagueReducer.error
})

const mapDispatchToProps = {
    resetAuthError,
    resetGeekError,
    resetGeekleagueError
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
