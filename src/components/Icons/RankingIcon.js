import React from 'react'

const RankingIcon = ({ size, color = '#F0F7F4', className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" fill={color} width={size} height={size}><rect fill="none" height="24" width="24" /><g><path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z" /></g></svg>
    )
}

export default RankingIcon
