import React from 'react'
import { WarningIcon } from '../Icons'
import './errorMessage.css'

const ErrorMessage = ({ children, ...rest }) => {
    return (
        <p className='error-message-component' {...rest}><WarningIcon />&nbsp;{children}</p>
    )
}

export default ErrorMessage
