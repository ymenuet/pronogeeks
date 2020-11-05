import React from 'react'

const AdminButtons = ({ user, getStatus, getOdds }) => {

    return user.role === 'GEEK ADMIN' && <div>
        <button className='btn my-btn admin-btn top' onClick={getStatus}>Actualiser les scores</button>
        <button className='btn my-btn admin-btn top' onClick={getOdds}>Actualiser les cotes</button>
    </div>
}

export default AdminButtons
