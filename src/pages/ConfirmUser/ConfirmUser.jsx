import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../../components';

import { confirmEmail } from '../../state/actions/authActions';

const ConfirmUser = ({
  match: {
    params: { userID, confirmToken },
  },
}) => {
  const { user, usernameConfirmed, loading, error } = useSelector(({ authReducer }) => authReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(confirmEmail(userID, confirmToken));
  }, [dispatch, userID, confirmToken]);

  return (
    <div
      className="my-content-homepage"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {error || user?.confirmed ? (
        <Redirect to="/" />
      ) : loading || !usernameConfirmed ? (
        <Loader tip="Enregistrement du compte..." color="rgb(4, 78, 199)" />
      ) : (
        <div
          style={{
            padding: 30,
            background: 'rgba(4, 78, 199, 0.8)',
            borderRadius: 10,
            width: '80%',
          }}
        >
          <h4 style={{ color: 'white' }}>
            Merci {usernameConfirmed}, ton email est confirmé !<br />
            Tu peux maintenant te connecter.
          </h4>

          <div className="home-register">
            <Link className="btn my-btn login-btn" to="/login">
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmUser;
