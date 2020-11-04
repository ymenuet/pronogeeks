import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserLeagues } from '../services/geekLeague'
import { Loader } from '../components'

const GeekLeagues = ({ loading }) => {
    const [geekLeagues, setGeekLeagues] = useState(null)

    useEffect(() => {
        const fetchUserLeagues = async () => {
            const geekLeagues = await getUserLeagues()
            setGeekLeagues(geekLeagues)
        }
        fetchUserLeagues()
    }, [])

    return <div className='geekleague-bg geekleagues-list'>
        {!geekLeagues || loading ? (
            <Loader />
        ) : (
                <div className='container'>
                    <h2>Mes Ligues Geek</h2>
                    <div className='my-geekleagues row'>
                        {geekLeagues.map(geekLeague => <div key={geekLeague._id} className='col-10 col-lg-6 geekleague-card-container'>
                            <div className='geekleague-card'>
                                <h4>{geekLeague.name}</h4>
                                <h6>Créée par {geekLeague.creator.username} en {new Date(geekLeague.createdAt).getMonth() + 1 > 9 ? new Date(geekLeague.createdAt).getMonth() + 1 : `0${new Date(geekLeague.createdAt).getMonth() + 1}`}/{new Date(geekLeague.createdAt).getFullYear()}</h6>
                                <Link to={`/myGeekLeagues/${geekLeague._id}`} className='btn my-btn new-league geekleagues-page-btn'>Voir le détail</Link>
                            </div>
                        </div>
                        )}
                    </div>
                    <Link to='/myGeekLeagues/new' className='btn my-btn new-league geekleagues-page-btn'>Créer une ligue</Link>
                </div>
            )}
    </div>
}

export default GeekLeagues
