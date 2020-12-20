import React, { useContext } from 'react'
import { updateFixturesStatus, updateOdds } from '../services/apiFootball'
import { getProfile } from '../services/auth'
import { openNotification } from '../helpers'
import { Context } from '../context'
import '../styles/adminButtons.css'

const AdminButtons = ({ seasonID, matchweekNumber, setFixtures, setPoints, fetchFixtures }) => {

    const { user, loginUser } = useContext(Context)

    const getStatus = async () => {
        const data = await updateFixturesStatus(seasonID, matchweekNumber)
        if (data.message) return openNotification('warning', 'Actualisation abortée', data.message.fr)
        else {
            setFixtures(null)
            setFixtures(data.fixtures)
            openNotification('success', 'Scores et dates actualisés')
            const user = await getProfile()
            loginUser(user)
            setPoints(user)
        }
    }

    const getOdds = async () => {
        const message = await updateOdds(seasonID, matchweekNumber)
        if (message) return openNotification('warning', 'Actualisation abortée', message.fr)
        else {
            const updated = await fetchFixtures(seasonID, matchweekNumber)
            if (updated) {
                openNotification('success', 'Cotes actualisées')
            }
        }
    }

    return user.role === 'GEEK ADMIN' && <div>

        <button
            className='btn my-btn admin-btn top'
            onClick={getStatus}
        >
            Actualiser les scores
        </button>

        <button
            className='btn my-btn admin-btn top'
            onClick={getOdds}
        >
            Actualiser les cotes
        </button>

    </div>
}

export default AdminButtons
