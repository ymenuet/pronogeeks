import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useUser } from '../../hooks';
import { Signup } from '../../../pages';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const { user, isUserConnected } = useUser();

  const { usernameConfirmed, profileError } = useSelector(({ authReducer }) => authReducer);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserConnected === 0 && !profileError) return <Component {...props} loading />;
        if (isUserConnected && !user.confirmed && !usernameConfirmed)
          return <Signup emailToConfirm />;
        if (isUserConnected) return <Component {...props} />;
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
