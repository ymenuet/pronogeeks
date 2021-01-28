import React from 'react'
import { WarningIcon } from './Icons'
import '../styles/errorMessage.css'

const ErrorMessage = ({ children }) => {
    return (
        <p className='error-message-component'><WarningIcon />&nbsp;{children}</p>
    )
}

export default ErrorMessage
