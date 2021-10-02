import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { SocialLogins, Loader } from '../../components';
import { Input, PasswordInput } from '../../ui/components';
import { useForm } from '../../utils/hooks';
import { login } from '../../state/actions/authActions';
import { InputWrapper } from './Login.styled';
import './connectPages.css';

const formNames = {
  email: 'email',
  password: 'password',
};

const Login = ({ loadingUser }) => {
  const dispatch = useDispatch();
  const handleLogin = ({ email, password }) => dispatch(login({ email, password }));
  const { inputsProps, handleSubmit } = useForm({
    initialValues: {
      [formNames.email]: '',
      [formNames.password]: '',
    },
    onSubmit: handleLogin,
    validations: {
      [formNames.email]: {},
      [formNames.password]: {},
    },
  });

  const { loading } = useSelector(({ authReducer }) => authReducer);

  return (
    <div className="register-pages">
      {loadingUser || loading ? (
        <Loader tip="Chargement..." color="rgb(4, 78, 199)" />
      ) : (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <h2>Se connecter</h2>

            <form onSubmit={handleSubmit}>
              <InputWrapper>
                <Input
                  placeholder="roi.geek@pronogeeks.fr"
                  label="Email :"
                  labelColor="white"
                  {...inputsProps[formNames.email]}
                />
              </InputWrapper>

              <InputWrapper>
                <PasswordInput
                  placeholder="********"
                  label="Mot de passe :"
                  labelColor="white"
                  {...inputsProps[formNames.password]}
                />
              </InputWrapper>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <button type="submit" className="btn register-btn my-btn submit-btn">
                  Me connecter
                </button>

                <p className="reset-pwd">
                  Tu as encore oublié ton mot de passe ?<br />
                  Clique <Link to="/reset-pwd">ici</Link> pour le renouveler.
                </p>
              </div>
            </form>

            <SocialLogins login />
          </div>

          <Link to="/privacy-policy" className="privacy-policy-link">
            Politique de confidentialité
          </Link>
        </div>
      )}
    </div>
  );
};

Login.defaultProps = {
  loadingUser: false,
};

Login.propTypes = {
  loadingUser: PropTypes.bool,
};

export default Login;
