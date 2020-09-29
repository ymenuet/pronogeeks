import React, { useState, useEffect, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { getUserLeagues } from '../services/geekLeague'
import { Spin, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../context'

const GeekLeagues = () => {
    const { user } = useContext(Context)
    const [geekLeagues, setGeekLeagues] = useState(null)

    useEffect(() => {
        const fetchUserLeagues = async () => {
            const geekLeagues = await getUserLeagues()
            setGeekLeagues(geekLeagues)
        }
        fetchUserLeagues()
    }, [])

    return <div className='geekleague-bg geekleagues-list'>
        {!geekLeagues ? (<div className='loader-container'>
            <Space size='large'>
                <Spin size='large' tip='Chargement de la page...' style={{ color: 'white', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }} />} />
            </Space>
        </div>
        ) : !user ? (
            <Redirect to='/login' />
        ) : (
                    <div className='container'>
                        <h2>Tes Ligues Geek</h2>
                        <div className='my-geekleagues row'>
                            {geekLeagues.map(geekLeague => <div key={geekLeague._id} className='col-10 offset-1 col-lg-6 offset-lg-0 geekleague-card-container'>
                                <div className='geekleague-card'>
                                    <h4>{geekLeague.name}</h4>
                                    <h6>Créée par {geekLeague.creator.username} en {new Date(geekLeague.createdAt).getMonth().length > 1 ? new Date(geekLeague.createdAt).getMonth() : `0${new Date(geekLeague.createdAt).getMonth()}`}/{new Date(geekLeague.createdAt).getFullYear()}</h6>
                                    <Link to={`/myGeekLeagues/${geekLeague._id}`} className='btn my-btn new-league geekleagues-page-btn'>Voir le détail</Link>
                                </div>
                            </div>
                            )}
                        </div>
                        <Link to='/myGeekLeagues/new' className='btn my-btn new-league geekleagues-page-btn'>Créer une ligue</Link>
                    </div>
                )}

    </div >
}

export default GeekLeagues
