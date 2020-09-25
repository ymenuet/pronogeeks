import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { getAllFixtures } from '../services/seasons'
import { updateProfileWithSeason } from '../services/user'
import { Space, Spin } from 'antd'

const PronogeeksSearch = ({ match: { params: { seasonID } } }) => {

    const [matchweek, setMatchweek] = useState(null)

    useEffect(() => {
        const updateProfile = async (seasonID) => {
            await updateProfileWithSeason(seasonID)
        }
        updateProfile(seasonID)

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

    return !matchweek ? (
        <div className='pronogeeks-bg'>
            <Space size='large'>
                <Spin size='large' />
            </Space>
        </div>
    ) : (
            <div className='pronogeeks-bg'>
                <Redirect to={`/pronogeeks/${seasonID}/matchweek/${matchweek}`} />
            </div>
        )
}

export default PronogeeksSearch
