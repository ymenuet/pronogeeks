import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { openNotification } from '../helpers'

import * as authActions from '../actions/authActions'

const ErrorNotification = (props) => {

    const { types } = props

    const errors = {
        auth: props.authError
    }

    const resets = {
        auth: props.resetAuthError
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
    authError: state.authReducer.error
})

const mapDispatchToProps = {
    ...authActions
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
