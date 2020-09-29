import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
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

    return <div className='geekleague-bg row'>
        {!geekLeagues ? (<div className='loader-container'>
            <Space size='large'>
                <Spin size='large' tip='Chargement de la page...' style={{ color: 'white', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'white', fontSize: '3rem', marginBottom: 8 }} />} />
            </Space>
        </div>
        ) : !user ? (
            <Redirect to='/login' />
        ) : (
                    <div>
                        <h2>Tes Ligues Geek</h2>
                        <div className='my-geekLeagues row'>
                            {geekLeagues.map(geekLeague => <div key={geekLeague._id} className='col-10 offset-1 col-lg-6'>
                                <h4>{geekLeague.name}</h4>
                            </div>
                            )}
                        </div>
                    </div>
                )}

    </div >
}

export default GeekLeagues
