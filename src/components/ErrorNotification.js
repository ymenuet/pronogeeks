import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { openNotification } from '../helpers'

import * as mapDispatchToProps from '../actions/authActions'

const ErrorNotification = ({ error, resetError }) => {

    useEffect(() => {
        if (error) {
            openNotification('error', error)
            resetError()
        }
    }, [error, resetError])

    return <div></div>
}

const mapStateToProps = ({ authReducer }) => authReducer

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
