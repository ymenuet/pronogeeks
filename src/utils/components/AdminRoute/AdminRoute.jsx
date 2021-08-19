import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import USER_ROLES from '../../models/userRoles';
import { useUser } from '../../hooks';

const AdminRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const { user, isUserConnected } = useUser();

  const { profileError } = useSelector(({ authReducer }) => authReducer);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserConnected === 0 && !profileError) return <Component {...props} loading />;
        if (isUserConnected && user.role === USER_ROLES.GEEK_ADMIN) return <Component {...props} />;
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

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AdminRoute;
