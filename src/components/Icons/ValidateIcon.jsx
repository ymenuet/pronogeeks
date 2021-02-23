import React from 'react'

const ValidateIcon = ({ className = null, size = '24px', color = 'white' }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={size} height={size}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    )
}

export default ValidateIcon