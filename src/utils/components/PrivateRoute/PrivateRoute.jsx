import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../../hooks';
import { Signup } from '../../../pages';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isUserConnected } = useUser();

  const { usernameConfirmed, profileError } = useSelector(
    ({ authReducer: { usernameConfirmed, profileError } }) => ({ usernameConfirmed, profileError })
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        isUserConnected === 0 && !profileError ? (
          <Component {...props} loading />
        ) : isUserConnected && !user.confirmed && !usernameConfirmed ? (
          <Signup emailToConfirm />
        ) : isUserConnected ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
