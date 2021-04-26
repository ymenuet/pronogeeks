import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { useUser } from '../../utils/hooks'

const PublicRoute = ({ component: Component, ...rest }) => {

    const { isUserConnected } = useUser()

    const profileError = useSelector(({ authReducer }) => authReducer.profileError)

    return (
        <Route
            {...rest}
            render={props => isUserConnected === 0 && !profileError ? (
                <Component {...props} loadingUser />
            ) : !isUserConnected ? (
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

export default PublicRoute