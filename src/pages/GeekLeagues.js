import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Loader } from '../components'
import { isConnected, isEmpty } from '../helpers'
import '../styles/geekleagues.css'

import { getUserLeagues } from '../actions/geekleagueActions'

const GeekLeagues = ({ loading, loadingGeekleague, user, geekleagues, getUserLeagues, errorGeekleague }) => {
    const [userGeekleagues, setUserGeekleagues] = useState(null)

    useEffect(() => {
        if (isEmpty(geekleagues)) getUserLeagues()

        else if (
            !isEmpty(geekleagues) &&
            isConnected(user) &&
            user.geekLeagues.length > Object.keys(geekleagues).length
        ) getUserLeagues()

        else if (
            !isEmpty(geekleagues) &&
            isConnected(user) &&
            user.geekLeagues.length === Object.keys(geekleagues).length
        ) setUserGeekleagues(Object.values(geekleagues))

    }, [user, loadingGeekleague, geekleagues, getUserLeagues, errorGeekleague])


    return <div className='geekleague-bg geekleagues-list'>
        {!userGeekleagues || loading ? (

            <Loader />

        ) : (

                <div className='container'>

                    <h2>Mes Ligues Geek</h2>

                    <div className='my-geekleagues row'>

                        {userGeekleagues.map(geekLeague => <div
                            key={geekLeague._id}
                            className='col-10 col-lg-6 geekleague-card-container'
                        >
                            <div className='geekleague-card'>

                                <h4>{geekLeague.name}</h4>

                                <h6>Créée par {geekLeague.creator.username} en {new Date(geekLeague.createdAt).getMonth() + 1 > 9 ? new Date(geekLeague.createdAt).getMonth() + 1 : `0${new Date(geekLeague.createdAt).getMonth() + 1}`}/{new Date(geekLeague.createdAt).getFullYear()}</h6>

                                <Link
                                    to={`/myGeekLeagues/${geekLeague._id}`}
                                    className='btn my-btn new-league geekleagues-page-btn'
                                >
                                    Voir le détail
                                </Link>

                            </div>
                        </div>
                        )}

                    </div>

                    <Link
                        to='/myGeekLeagues/new'
                        className='btn my-btn new-league geekleagues-page-btn'
                    >
                        Créer une ligue
                    </Link>

                </div>
            )}
    </div>
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    geekleagues: state.geekleagueReducer.geekleagues,
    loadingGeekleague: state.geekleagueReducer.loading,
    errorGeekleague: state.geekleagueReducer.error
})

const mapDispatchToProps = { getUserLeagues }

export default connect(mapStateToProps, mapDispatchToProps)(GeekLeagues)
