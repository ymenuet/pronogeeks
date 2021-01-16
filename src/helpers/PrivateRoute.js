import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { isConnected } from '../helpers'
//import { Context } from '../context'
import { Signup } from '../pages'

import * as mapDispatchToProps from '../actions/authActions'

const PrivateRoute = ({ component: Component, user, setProfile, ...rest }) => {

    //const { user } = useContext(Context)

    useEffect(() => {
        if (!isConnected(user)) setProfile()
    }, [user, setProfile])

    return (
        <Route
            {...rest}
            render={props => isConnected(user) === 0 ? (
                <Component {...props} loading />
            ) : isConnected(user) && !user.confirmed ? (
                <Signup confirm={true} />
            ) : isConnected(user) ? (
                <Component {...props} />
            ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }}
                            />
                        )}
        />
    )
}

const mapStateToProps = ({ authReducer }) => authReducer

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
