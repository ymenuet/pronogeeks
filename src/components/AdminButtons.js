import React from 'react'
import { connect } from 'react-redux'
import '../styles/adminButtons.css'

import * as mapDispatchToProps from '../actions/apiFootballActions'

const AdminButtons = ({ user, loadingApi, season, matchweekNumber, updateFixturesStatus, updateOdds }) => {

    // const getOdds = async () => {
    //     const message = await updateOdds(season._id, matchweekNumber)
    //     if (message) return openNotification('warning', 'Actualisation abortée', message.fr)
    //     else {
    //         setMatchweekFixtures(season, matchweekNumber)
    //         openNotification('success', 'Cotes actualisées')
    //     }
    // }

    return user.role === 'GEEK ADMIN' && <div>

        <button
            className='btn my-btn admin-btn top'
            onClick={() => updateFixturesStatus(season._id, matchweekNumber)}
            disabled={loadingApi}
        >
            Actualiser les scores
        </button>

        <button
            className='btn my-btn admin-btn top'
            onClick={() => updateOdds(season._id, matchweekNumber)}
            disabled={loadingApi}
        >
            Actualiser les cotes
        </button>

    </div>
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    loadingApi: state.apiFootballReducer.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminButtons)
