import React from 'react'

import { StyledInput } from './Input.styled'

const Input = ({ value, onChange, placeholder, disabled }) => {
    return (
        <StyledInput
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
        />
    )
}

Input.defaultProps = {
    value: '',
    onChange: () => { },
    placeholder: '',
    diabled: false,
}

export default Input
