import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { isConnected } from '../helpers'
import { Signup } from '../pages'

const PrivateRoute = ({ component: Component, user, usernameConfirmed, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => isConnected(user) === 0 ? (
                <Component {...props} loading />
            ) : isConnected(user) && !user.confirmed && !usernameConfirmed ? (
                <Signup emailToConfirm={true} />
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

export default connect(mapStateToProps)(PrivateRoute)
