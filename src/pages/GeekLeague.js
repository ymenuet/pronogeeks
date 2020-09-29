import React, { useState, useEffect } from 'react'
import { fetchLeague } from '../services/geekLeague'
import { getUndergoingSeasons } from '../services/seasons'
import { Spin, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const GeekLeague = ({ match: { params: { geekLeagueID } } }) => {
    const [geekLeague, setGeekLeague] = useState(null)
    const [seasons, setSeasons] = useState(null)

    useEffect(() => {
        const getLeague = async () => {
            const geekLeague = await fetchLeague(geekLeagueID)
            setGeekLeague(geekLeague)
        }
        getLeague()
        const getSeasons = async () => {
            const seasons = await getUndergoingSeasons()
            setSeasons(seasons)
        }
        getSeasons()
    }, [geekLeagueID])

    return <div className='geekleague-bg row'>
        {!geekLeague || !seasons ? (
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'white', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }} />} />
                </Space>
            </div>
        ) : (
                <div className='geekleague-page'>
                    <h2>Ligue {geekLeague.name}</h2>
                    <div className='row'>
                        {seasons.map(season => <div key={season._id} className='league-season-ranking'>
                            <ul>
                                {geekLeague.geeks.map(geek => <li key={geek._id}>{geek.username}</li>)}
                            </ul>
                        </div>)}
                    </div>
                </div>
            )}
    </div>
}

export default GeekLeague
