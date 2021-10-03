import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../components';
import { useNotification, useForm } from '../../utils/hooks';
import { Input } from '../../ui/components';
import { isEmail } from '../../utils/helpers/inputValidations';
import { resetPwd } from '../../state/actions/authActions';
import { InputWrapper } from './RequestPwdReset.styled';

const formNames = {
  email: 'email',
};

const RequestPwdReset = ({ loadingUser }) => {
  const { push } = useHistory();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const onSubmit = ({ email }) => {
    dispatch(resetPwd(email));
  };
  const { inputsProps, handleSubmit } = useForm({
    initialValues: {
      [formNames.email]: '',
    },
    onSubmit,
    validations: {
      [formNames.email]: {
        validation: isEmail,
        message: t('formValidations.invalidEmail'),
      },
    },
  });

  const { loading, pwdToReset } = useSelector(({ authReducer }) => authReducer);

  useNotification(
    pwdToReset,
    {
      type: 'success',
      title: 'Email envoyé',
      message: 'Un email a été envoyé à ton adresse mail pour renouveler ton mot de passe.',
    },
    () => push('/login')
  );

  return (
    <div className="register-pages">
      {loadingUser && <Loader tip="Chargement..." color="rgb(4, 78, 199)" />}

      {!loadingUser && loading && <Loader tip="Envoi de l'email..." color="rgb(4, 78, 199)" />}

      {!loadingUser && !loading && (
        <div className="row signup-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <h2>Renouvelle ton mot de passe</h2>

            <form onSubmit={handleSubmit}>
              <InputWrapper>
                <Input
                  placeholder="roi.geek@pronogeeks.fr"
                  label="Email :"
                  labelColor="white"
                  {...inputsProps}
                />
              </InputWrapper>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <button type="submit" className="btn register-btn my-btn submit-btn">
                  Renouveler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

RequestPwdReset.defaultProps = {
  loadingUser: false,
};

RequestPwdReset.propTypes = {
  loadingUser: PropTypes.bool,
};

export default RequestPwdReset;
