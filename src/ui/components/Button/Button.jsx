import React from 'react'
import { buttonFactory } from './Button.styled'
import kinds from './kinds'

const Button = ({ label, type, disabled, onClick, level, kind = 'base' }) => {
    const Button = buttonFactory(level)

    return (
        <Button type={type} disabled={disabled} onClick={onClick} kind={disabled ? kinds.disabled : kind}>
            {label}
        </Button>
    )
}

export default Button
