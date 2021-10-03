import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../components';
import { openNotification } from '../../utils/helpers';
import { arePasswordsMatching } from '../../utils/helpers/inputValidations';
import { useForm } from '../../utils/hooks';
import { PasswordInput } from '../../ui/components';
import { updatePwd } from '../../state/actions/authActions';
import { InputWrapper } from './SetNewPwd.styled';

const formNames = {
  password: 'password',
  passwordRepeat: 'passwordRepeat',
};

const SetNewPwd = ({ loadingUser }) => {
  const { userID, renewToken } = useParams();
  const { push } = useHistory();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const onSubmit = ({ password }) => {
    dispatch(updatePwd(userID, renewToken, password));
  };
  const { inputsProps, handleSubmit } = useForm({
    initialValues: {
      [formNames.password]: '',
      [formNames.passwordRepeat]: '',
    },
    onSubmit,
    validations: {
      [formNames.password]: {},
      [formNames.passwordRepeat]: {
        validation: () =>
          arePasswordsMatching(
            inputsProps[formNames.password].value,
            inputsProps[formNames.passwordRepeat].value
          ),
        message: t('formValidations.notMatchingPasswords'),
      },
    },
  });

  const { loading, pwdUpdated } = useSelector(({ authReducer }) => authReducer);

  useEffect(() => {
    if (pwdUpdated) {
      openNotification('success', 'Mot de passe actualisé.');
      push('/login');
    }
  }, [pwdUpdated, push]);

  return (
    <div className="register-pages">
      {loadingUser && <Loader tip="Chargement..." color="rgb(4, 78, 199)" />}

      {!loadingUser && loading && (
        <Loader tip="Enregistrement du mot de passe..." color="rgb(4, 78, 199)" />
      )}

      {!loadingUser && !loading && (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <h2>Renouvelle ton mot de passe</h2>

            <form onSubmit={handleSubmit}>
              <InputWrapper label="Mot de passe :">
                <PasswordInput
                  label="Mot de passe :"
                  labelColor="white"
                  {...inputsProps[formNames.password]}
                />
              </InputWrapper>

              <InputWrapper>
                <PasswordInput
                  label="Répéter le mot de passe :"
                  labelColor="white"
                  {...inputsProps[formNames.passwordRepeat]}
                />
              </InputWrapper>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <button type="submit" className="btn register-btn my-btn submit-btn">
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

SetNewPwd.defaultProps = {
  loadingUser: false,
};

SetNewPwd.propTypes = {
  loadingUser: PropTypes.bool,
};

export default SetNewPwd;
