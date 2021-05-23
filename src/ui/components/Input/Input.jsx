import React from 'react'
import PropTypes from 'prop-types'

import { randomNum } from '../../../utils/helpers'
import { Container, StyledInput, Label } from './Input.styled'

const generateId = ({ name, placeholder }) => `input_${name}_${placeholder}_${randomNum()}`.replaceAll(' ', '')

const Input = ({ label, value, onChange, placeholder, disabled, type, name, maxLength, ...props }) => {
    const handleChange = (e) => {
        !disabled && onChange(e)
    }
    const id = generateId({ name, placeholder })

    return (<Container>
        {label && <Label htmlFor={id}>{label}</Label>}
        <StyledInput
            id={id}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            name={name}
            maxLength={maxLength}
            {...props}
        />
    </Container>
    )
}

Input.defaultProps = {
    value: '',
    label: null,
    onChange: () => { },
    placeholder: '',
    disabled: false,
    type: 'text',
    name: '',
    maxLength: Number.MAX_SAFE_INTEGER,
}

Input.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.number,
}

export default Input
