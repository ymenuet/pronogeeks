import React from 'react'
import { Btn } from './Button.styled'

const Button = ({ label, type, disabled, onClick }) => {
    return (
        <Btn type={type} disabled={disabled} onClick={onClick}>
            {label}
        </Btn>
    )
}

export default Button
