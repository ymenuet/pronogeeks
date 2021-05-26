import React from 'react'
import PropTypes from 'prop-types'

import { generateInputId } from '../../../utils/helpers'
import InputValidation from '../InputValidation'
import { Container, StyledInput, Label } from './Input.styled'

const Input = ({ label, value, onChange, placeholder, validation, disabled, type, name, maxLength }) => {
    const handleChange = (e) => {
        !disabled && onChange(e)
    }
    const id = generateInputId({ name, placeholder })

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
        />

        {validation && <InputValidation validation={validation} />}

    </Container>
    )
}

Input.defaultProps = {
    value: '',
    label: null,
    onChange: () => { },
    placeholder: '',
    validation: undefined,
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
    validation: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.number,
}

export default Input
