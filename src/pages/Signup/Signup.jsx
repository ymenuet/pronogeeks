/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Loader, SocialLogins } from '../../components';
import { Input, PasswordInput, FileInput } from '../../ui/components';
import { UsernameInput } from '../../utils/components';
import { useForm } from '../../utils/hooks';
import { isEmail } from '../../utils/helpers/inputValidations';
import { InputWrapper } from './Signup.styled';
import './connectPages.css';

import { signup } from '../../state/actions/authActions';

const formNames = {
  email: 'email',
  username: 'username',
  password: 'password',
  photo: 'photo',
};

const Signup = ({ loadingUser, emailToConfirm }) => {
  const [signupLoading, setSignupLoading] = useState(false);

  const { loading, signedup } = useSelector(({ authReducer }) => authReducer);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(signup(values));
  };

  const { inputsProps, handleSubmit } = useForm({
    initialValues: {
      [formNames.email]: '',
      [formNames.username]: '',
      [formNames.password]: '',
      [formNames.photo]: undefined,
    },
    onSubmit,
    validations: {
      [formNames.email]: {
        validation: isEmail,
        message: `Email non valide...`,
      },
      [formNames.username]: {},
      [formNames.password]: { message: "Tu auras besoin d'un mot de passe pour te connecter !" },
    },
  });

  return (
    <div className="register-pages">
      {loadingUser && <Loader tip="Chargement..." color="rgb(4, 78, 199)" />}

      {!loadingUser && (loading || signupLoading) && (
        <Loader tip="Enregistrement du compte..." color="rgb(4, 78, 199)" />
      )}

      {!loadingUser && !loading && !signupLoading && (signedup || emailToConfirm) && (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3">
            <h3>
              Merci pour ton inscription ! Un mail t&apos;a été envoyé pour confirmer ton adresse
              email.
            </h3>
          </div>
        </div>
      )}

      {!loadingUser && !loading && !signupLoading && !signedup && !emailToConfirm && (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3">
            <h2>Créer un compte</h2>

            <form onSubmit={(e) => handleSubmit(e, setSignupLoading)}>
              <InputWrapper>
                <Input
                  placeholder="roi.geek@pronogeeks.fr"
                  label="Email :"
                  labelColor="white"
                  {...inputsProps[formNames.email]}
                />
              </InputWrapper>

              <InputWrapper>
                <UsernameInput labelColor="white" {...inputsProps[formNames.username]} />
              </InputWrapper>

              <InputWrapper>
                <PasswordInput
                  placeholder="********"
                  label="Mot de passe :"
                  labelColor="white"
                  {...inputsProps[formNames.password]}
                />
              </InputWrapper>

              <InputWrapper>
                <FileInput
                  label="Photo de profil :"
                  labelColor="white"
                  placeholder="Aucune image selectionnée"
                  buttonLabel="Choisir une image"
                  {...inputsProps[formNames.photo]}
                />
              </InputWrapper>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  className="btn my-btn submit-btn register-btn"
                  style={{ marginTop: 10 }}
                  disabled={signupLoading}
                >
                  Créer mon compte
                </button>
              </div>
            </form>

            <SocialLogins />
          </div>

          <Link to="/privacy-policy" className="privacy-policy-link">
            Politique de confidentialité
          </Link>
        </div>
      )}
    </div>
  );
};

Signup.defaultProps = {
  loadingUser: false,
  emailToConfirm: false,
};

Signup.propTypes = {
  loadingUser: PropTypes.bool,
  emailToConfirm: PropTypes.bool,
};

export default Signup;
