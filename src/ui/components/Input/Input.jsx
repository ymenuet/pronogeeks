import React from 'react'
import PropTypes from 'prop-types'

import { StyledInput } from './Input.styled'

const Input = ({ value, onChange, placeholder, disabled, type, name, maxLength, ...props }) => {
    const handleChange = (e) => {
        !disabled && onChange(e.target.value, e.target.name)
    }
    return (
        <StyledInput
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            name={name}
            maxLength={maxLength}
            {...props}
        />
    )
}

Input.defaultProps = {
    value: '',
    onChange: () => { },
    placeholder: '',
    disabled: false,
    type: 'text',
    name: '',
    maxLength: Number.MAX_SAFE_INTEGER,
}

Input.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.number,
}

export default Input
