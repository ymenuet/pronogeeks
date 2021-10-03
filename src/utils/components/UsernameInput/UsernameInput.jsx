import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import i18n from '../../../i18n';
import Input from '../../../ui/components/Input';
import {
  USERNAME_MAX_LENGTH,
  NOTIFICATION_DEFAULT_DURATION_SECONDS,
} from '../../constants/general';
import { openNotification } from '../../helpers';

const UsernameInput = ({ name, value, onChange, disabled, label, validation, ...props }) => {
  const { t } = useTranslation();

  const notifMoment = useRef();

  const handleChange = (val, inputName, event) => {
    const notifDuration = NOTIFICATION_DEFAULT_DURATION_SECONDS * 1000;
    if (val.length > USERNAME_MAX_LENGTH) {
      if (!notifMoment.current || Date.now() - notifMoment.current > notifDuration) {
        notifMoment.current = Date.now();
        openNotification(
          'warning',
          t('notifications.formValidations.usernameTooLong.title'),
          t('notifications.formValidations.usernameTooLong.message'),
          notifDuration / 1000
        );
      }
      return;
    }

    onChange(val, inputName, event);
  };

  return (
    <Input
      onChange={handleChange}
      value={value}
      placeholder={t('forms.usernameInput.placeholder')}
      name={name}
      disabled={disabled}
      maxLength={USERNAME_MAX_LENGTH}
      label={label}
      validation={validation}
      {...props}
    />
  );
};

UsernameInput.defaultProps = {
  label: i18n.t('forms.usernameInput.defaultLabel', {
    maxLength: USERNAME_MAX_LENGTH,
  }),
  value: '',
  disabled: false,
  validation: undefined,
};

UsernameInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.string,
};

export default UsernameInput;
