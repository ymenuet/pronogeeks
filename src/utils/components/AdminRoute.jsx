import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import USER_ROLES from '../models/userRoles'
import { useUser } from '../hooks'

const AdminRoute = ({ component: Component, ...rest }) => {

    const { user, isUserConnected } = useUser()

    const { profileError } = useSelector(({ authReducer: { usernameConfirmed, profileError } }) => ({ usernameConfirmed, profileError }))

    return (
        <Route
            {...rest}
            render={props => isUserConnected === 0 && !profileError ? (
                <Component {...props} loading />
            ) : isUserConnected && user.role === USER_ROLES.GEEK_ADMIN ? (
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

export default AdminRoute