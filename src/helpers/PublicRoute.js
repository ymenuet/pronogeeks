import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { isConnected } from '../helpers'

const PublicRoute = ({ component: Component, user, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => isConnected(user) === 0 ? (
                <Component {...props} loadingUser />
            ) : !isConnected(user) ? (
                <Component {...props} />
            ) : (
                        <Redirect
                            to={{
                                pathname: '/profile',
                                state: { from: props.location }
                            }}
                        />
                    )}
        />
    )
}

const mapStateToProps = ({ authReducer }) => authReducer

export default connect(mapStateToProps)(PublicRoute)