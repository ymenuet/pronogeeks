import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import { VisibilityOnIcon, VisibilityOffIcon } from './PasswordInput.styled'

const PasswordInput = ({
    label,
    labelColor,
    value,
    onChange,
    validation,
    disabled,
    name,
    maxLength,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [iconHovered, setIconHovered] = useState(false)

    const type = isPasswordVisible ? 'text' : 'password'

    const renderIcon = () => {
        const Icon = isPasswordVisible ? VisibilityOffIcon : VisibilityOnIcon

        return <Icon
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            isHovered={iconHovered}
            size={20}
        />
    }

    return (
        <Input
            label={label}
            labelColor={labelColor}
            value={value}
            onChange={onChange}
            placeholder="********"
            validation={validation}
            disabled={disabled}
            name={name}
            maxLength={maxLength}
            icon={renderIcon()}
            type={type}
        />
    )
}

Input.defaultProps = {
    value: "",
    label: null,
    labelColor: "label",
    placeholder: "",
    validation: undefined,
    disabled: false,
    name: "",
    maxLength: Number.MAX_SAFE_INTEGER,
};

Input.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    labelColor: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    validation: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    maxLength: PropTypes.number,
};

export default PasswordInput
