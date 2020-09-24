import React, { useState, useEffect, useContext } from 'react'
import { getMatchweekFixtures } from '../services/seasons'
import { Fixture } from '../components'
import { Spin, Space } from 'antd'
import { Context } from '../context'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID } } }) => {
    const [fixtures, setFixtures] = useState(null)

    const { user } = useContext(Context)

    const fetchFixtures = async (season, matchweek) => {
        const fixtures = await getMatchweekFixtures(season, matchweek)
        fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        setFixtures(fixtures)
    }

    useEffect(() => {
        fetchFixtures(seasonID, matchweekNumber)
    }, [matchweekNumber, seasonID])

    return !fixtures ? (
        <div className='pronogeeks-bg'>
            <Space size='large'>
                <Spin size='large' />
            </Space>
        </div>
    ) : (
            <div className='pronogeeks-bg'>
                <ul className="list-group list-group-flush">
                    {fixtures.map(fixture => (
                        <li className="list-group-item" key={fixture._id} style={{ background: 'none' }}>
                            <Fixture fixtureID={fixture._id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
}

export default Pronogeeks
