import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Input from '../../../ui/components/Input'
import { USERNAME_MAX_LENGTH, NOTIFICATION_DEFAULT_DURATION_SECONDS } from '../../constants'
import { openNotification } from '../../helpers'
import { Label } from './UsernameInput.styled'

const UsernameInput = ({ value, onChange, disabled, label }) => {
    const { t } = useTranslation()

    const notifMoment = useRef()

    const handleChange = (value) => {
        const notifDuration = NOTIFICATION_DEFAULT_DURATION_SECONDS * 1000
        if (value.length > USERNAME_MAX_LENGTH) {
            if (!notifMoment.current || (Date.now() - notifMoment.current) > notifDuration) {
                notifMoment.current = Date.now()
                openNotification('warning', t('notifications.formValidations.usernameTooLong.title'), t('notifications.formValidations.usernameTooLong.message'), notifDuration / 1000)
            }
            return;
        }

        onChange(value)
    }

    return (
        <>
            <Label>{label || t('forms.usernameInput.defaultLabel', { maxLength: USERNAME_MAX_LENGTH })}</Label>
            <Input
                onChange={handleChange}
                value={value}
                placeholder={t('forms.usernameInput.placeholder')}
                disabled={disabled}
                maxLength={USERNAME_MAX_LENGTH}
            />
        </>
    )
}

UsernameInput.defaultProp = {
    label: '',
    value: '',
    disabled: false,
}

UsernameInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

export default UsernameInput
