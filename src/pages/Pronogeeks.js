import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { getMatchweekFixtures, getAllFixtures } from '../services/seasons'
import { updateProfileWithMatchweek, updateProfileWithSeason } from '../services/user'
import { updateFixturesStatus, updateOdds } from '../services/apiFootball'
import { getProfile } from '../services/auth'
import { Fixture } from '../components'
import { Spin, Space, notification } from 'antd'
import { Context } from '../context'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID } }, history }) => {
    const [season, setSeason] = useState(null)
    const [fixtures, setFixtures] = useState(null)
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)

    const { loginUser, user } = useContext(Context)

    useEffect(() => {
        const updateProfile = async (season, matchweek) => {
            await updateProfileWithSeason(season)
            await updateProfileWithMatchweek(season, matchweek)
        }
        const setNewUser = async () => {
            await updateProfile(seasonID, matchweekNumber)
            const user = await getProfile()
            loginUser(user)
            const seasonUser = user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0]
            const matchweekUser = seasonUser.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())[0]
            setMatchweekPoints(matchweekUser.totalPoints)
            setMatchweekBonus(matchweekUser.bonusPoints)
            setMatchweekCorrects(matchweekUser.numberCorrects)
        }
        setNewUser()

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

    const fetchStatus = async () => {
        const fixtures = await updateFixturesStatus(seasonID, matchweekNumber)
        setFixtures(fixtures)
        openNotification('success', 'Scores actualisés', 'Rafraîchir la page.')
    }

    const fetchOdds = async () => {
        await updateOdds(seasonID, matchweekNumber)
        openNotification('success', 'Cotes actualisées', 'Rafraîchir la page.')
    }

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight'
        })
    }

    const previousPage = () => {
        setFixtures(null)
        history.push(`/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) - 1}`)
    }

    const nextPage = () => {
        setFixtures(null)
        history.push(`/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) + 1}`)
    }

    return !fixtures || !season ? (
        <div className='pronogeeks-bg'>
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'rgb(26, 145, 254)', fontSize: '1.2rem' }} />
                </Space>
            </div>
        </div>
    ) : !user ? (
        <Redirect to='/login' />
    ) : (
                <div className='pronogeeks-bg matchweek-page'>
                    {user.role === 'SUPER GEEK' && <div>
                        <button className='btn my-btn admin-btn top' onClick={fetchStatus}>Actualiser les scores</button>
                        <button className='btn my-btn admin-btn top' onClick={fetchOdds}>Actualiser les cotes</button>
                    </div>}
                    <h2>{season.leagueName} saison {season.year} :<br />
                    journée {matchweekNumber}</h2>
                    <ul className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
                        <div className='previous-next-btns'>

                            {matchweekNumber != 1 && <div><button className='btn my-btn' onClick={previousPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg></button></div>}

                            {matchweekBonus > 0 && <div className='score-top'>Ton total J{matchweekNumber} : {matchweekPoints} pts<br />dont {matchweekBonus} pts bonus ({matchweekCorrects}/10)</div>}
                            {!matchweekBonus && <div className='score-top'>Ton total J{matchweekNumber} : {matchweekPoints} pts</div>}

                            {matchweekNumber != 38 && <div><button className='btn my-btn' onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></button></div>}

                        </div>
                        <div className='list-fixtures-header'>
                            <div className='header-title'>Domicile</div>
                            <div>|</div>
                            <div className='header-title'>Extérieur</div>
                        </div>
                        {fixtures.map(fixture => (
                            <li className="list-group-item" key={fixture._id} style={{ background: 'none' }}>
                                <Fixture fixtureID={fixture._id} />
                            </li>
                        ))}
                        <div className='previous-next-btns'>
                            <div><button className='btn my-btn' onClick={previousPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg></button></div>
                            {matchweekBonus > 0 && <div className='score-bottom'>Ton total J{matchweekNumber} : {matchweekPoints} pts<br />dont {matchweekBonus} pts bonus ({matchweekCorrects}/10)</div>}
                            {!matchweekBonus && <div className='score-bottom'>Ton total J{matchweekNumber} : {matchweekPoints} pts</div>}
                            <div><button className='btn my-btn' onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></button></div>
                        </div>
                    </ul>
                    {user.role === 'SUPER GEEK' && <div>
                        <button className='btn my-btn admin-btn' onClick={fetchStatus}>Actualiser les scores</button>
                        <button className='btn my-btn admin-btn' onClick={fetchOdds}>Actualiser les cotes</button>
                    </div>}
                </div>

            )
}

export default Pronogeeks
