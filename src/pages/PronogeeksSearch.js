import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { getAllFixtures } from '../services/seasons'
import { updateProfileWithSeason } from '../services/user'
import { getProfile } from '../services/auth'
import { Space, Spin } from 'antd'
import { Context } from '../context'

const PronogeeksSearch = ({ match: { params: { seasonID } } }) => {

    const { loginUser, user } = useContext(Context)

    const [matchweek, setMatchweek] = useState(null)

    useEffect(() => {
        const updateProfile = async (seasonID) => {
            await updateProfileWithSeason(seasonID)
        }
        const setNewUser = async () => {
            await updateProfile(seasonID)
            const user = await getProfile()
            loginUser(user)
        }
        setNewUser()

        const fetchSeason = async (seasonID) => {
            const season = await getAllFixtures(seasonID)
            const fixturesToCome = season.fixtures.filter(fixture => (new Date(fixture.date).getTime() - Date.now()) > 0 - 1000 * 60 * 120)
            let nextMatchweek = fixturesToCome[0].matchweek;
            let nextDate = fixturesToCome[0].date
            fixturesToCome.forEach(fixture => nextMatchweek = fixture.matchweek < nextMatchweek && new Date(fixture.date).getTime() < new Date(nextDate).getTime() ? fixture.matchweek : nextMatchweek)
            setMatchweek(nextMatchweek)
        }
        fetchSeason(seasonID)

    }, [seasonID])

    return !user ? (
        <Redirect to='/login' />
    ) : !matchweek ? (
        <div className='pronogeeks-bg'>
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'rgb(26, 145, 254)', fontSize: '1.2rem' }} />
                </Space>
            </div>
        </div>
    ) : (
                <div className='pronogeeks-bg'>
                    <Redirect to={`/pronogeeks/${seasonID}/matchweek/${matchweek}`} />
                </div>
            )
}

export default PronogeeksSearch
