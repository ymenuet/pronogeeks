import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { updateFixturesStatus, updateOdds } from '../services/apiFootball'
import { getProfile } from '../services/auth'
import { openNotification } from '../helpers'
import { Context } from '../context'
import '../styles/adminButtons.css'

const AdminButtons = ({ user, season, matchweekNumber, userMatchweek, setFixtures, setPoints, setMatchweekFixtures }) => {

    const { loginUser } = useContext(Context)

    const getStatus = async () => {
        const data = await updateFixturesStatus(season._id, matchweekNumber)
        if (data.message) return openNotification('warning', 'Actualisation abortée', data.message.fr)
        else {
            setFixtures(null)
            setFixtures(data.fixtures)
            openNotification('success', 'Scores et dates actualisés')
            const user = await getProfile()
            loginUser(user)
            setPoints(userMatchweek)
        }
    }

    const getOdds = async () => {
        const message = await updateOdds(season._id, matchweekNumber)
        if (message) return openNotification('warning', 'Actualisation abortée', message.fr)
        else {
            setMatchweekFixtures(season, matchweekNumber)
            openNotification('success', 'Cotes actualisées')
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

const mapStateToProps = state => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps)(AdminButtons)
