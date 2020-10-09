import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context'
import { Signup } from '../pages'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(Context)

    return (
        <Route
            {...rest}
            render={props => user === null ? (
                <Component {...props} loading />
            ) : user && !user.confirmed ? (
                <Signup confirm={true} />
            ) : user ? (
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

export default PrivateRoute
