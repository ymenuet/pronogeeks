import React, { useState, useEffect, useContext } from 'react'
import { getMatchweekFixtures, getAllFixtures } from '../services/seasons'
import { updateProfileWithMatchweek } from '../services/user'
import { Fixture } from '../components'
import { Spin, Space } from 'antd'
import { Context } from '../context'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID } } }) => {
    const [season, setSeason] = useState(null)
    const [fixtures, setFixtures] = useState(null)

    const { user } = useContext(Context)

    useEffect(() => {
        const updateProfile = async (season, matchweek) => {
            await updateProfileWithMatchweek(season, matchweek)
        }
        updateProfile(seasonID, matchweekNumber)

        const fetchSeason = async seasonID => {
            const season = await getAllFixtures(seasonID)
            setSeason(season)
        }
        fetchSeason(seasonID)

        const fetchFixtures = async (season, matchweek) => {
            const fixtures = await getMatchweekFixtures(season, matchweek)
            fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            setFixtures(fixtures)
        }
        fetchFixtures(seasonID, matchweekNumber)

    }, [matchweekNumber, seasonID])

    return !fixtures || !season ? (
        <div className='pronogeeks-bg'>
            <Space size='large'>
                <Spin size='large' />
            </Space>
        </div>
    ) : (
            <div className='pronogeeks-bg'>
                <ul className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
                    <br />
                    <h2>{season.leagueName} saison {season.year} :<br />
                    journée {matchweekNumber}</h2>
                    <div className='list-fixtures-header'>
                        <div>Domicile</div>
                        <div></div>
                        <div>Extérieur</div>
                    </div>
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
