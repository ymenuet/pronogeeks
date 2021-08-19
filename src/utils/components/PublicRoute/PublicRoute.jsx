import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useUser } from '../../hooks';

const PublicRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const { isUserConnected } = useUser();

  const { profileError } = useSelector(({ authReducer }) => authReducer);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserConnected === 0 && !profileError) return <Component {...props} loadingUser />;
        if (!isUserConnected) return <Component {...props} />;
        return (
          <Redirect
            to={{
              pathname: '/profile',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
