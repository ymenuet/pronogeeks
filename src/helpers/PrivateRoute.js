import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(Context)

    return (
        <Route
            {...rest}
            render={props => user === null ? (
                <Component {...props} loading />
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
