import React, { useState, useEffect, useContext } from 'react'
import { getMatchweekFixtures, getSeasonData } from '../services/seasons'
import { updateProfileWithMatchweek, updateProfileWithSeason } from '../services/user'
import { updateFixturesStatus, updateOdds } from '../services/apiFootball'
import { getProfile } from '../services/auth'
import { Fixture } from '../components'
import { Spin, Space, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../context'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID } }, history, loading }) => {
    const [season, setSeason] = useState(null)
    const [fixtures, setFixtures] = useState(null)
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)
    const [showRules, setShowRules] = useState(false)
    const [scoresUpdated, setScoresUpdated] = useState(false)
    const [oddsUpdated, setOddsUpdated] = useState(false)
    const [lastOddsUpdated, setLastOddsUpdated] = useState(null)
    const [lastScoresUpdated, setLastScoresUpdated] = useState(null)

    const { loginUser, user } = useContext(Context)

    const setPoints = user => {
        const seasonUser = user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0]
        const matchweekUser = seasonUser.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())[0]
        setMatchweekPoints(matchweekUser.totalPoints)
        setMatchweekBonus(matchweekUser.bonusPoints)
        setMatchweekCorrects(matchweekUser.numberCorrects)
    }

    const getStatus = async () => {
        const data = await updateFixturesStatus(seasonID, matchweekNumber)
        if (data.message) return openNotification('warning', 'Actualisation abortée', data.message.fr)
        else {
            setFixtures(null)
            setFixtures(data.fixtures)
            openNotification('success', 'Scores actualisés')
            const user = await getProfile()
            loginUser(user)
            setPoints(user)
        }
    }

    const getOdds = async () => {
        const message = await updateOdds(seasonID, matchweekNumber)
        if (message) return openNotification('warning', 'Actualisation abortée', message.fr)
        else {
            const updated = fetchFixtures(seasonID, matchweekNumber)
            if (updated) {
                openNotification('success', 'Cotes actualisées')
            }
        }
    }

    const fetchFixtures = async (season, matchweek) => {
        const fixtures = await getMatchweekFixtures(season, matchweek)
        fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        setFixtures(null)
        setFixtures(fixtures)
        return true
    }

    const dateTransform = (date) => {
        date = new Date(date)
        let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
        return `${date.getDate()}/${month}/${date.getFullYear()} à ${date.getHours()}h${minutes}`
    }

    const openNotification = (type, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: 'bottomRight',
            className: 'notification-box'
        })
    }

    useEffect(() => {

        const setPoints = user => {
            const seasonUser = user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0]
            const matchweekUser = seasonUser.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())[0]
            setMatchweekPoints(matchweekUser.totalPoints)
            setMatchweekBonus(matchweekUser.bonusPoints)
            setMatchweekCorrects(matchweekUser.numberCorrects)
        }

        const fetchStatus = async () => {
            const { fixtures } = await updateFixturesStatus(seasonID, matchweekNumber)
            setFixtures(null)
            setFixtures(fixtures)
            openNotification('success', 'Scores actualisés')
            const user = await getProfile()
            loginUser(user)
            setPoints(user)
        }

        const fetchOdds = async () => {
            await updateOdds(seasonID, matchweekNumber)
            const updated = fetchFixtures(seasonID, matchweekNumber)
            if (updated) {
                openNotification('success', 'Cotes actualisées')
            }
        }

        if (fixtures && user) {
            const fixtureDates = fixtures.map(fixture => new Date(fixture.date).getTime())
            const minDate = Math.min(...fixtureDates)
            const maxDate = Math.max(...fixtureDates)
            const fixturesInLessThanOneWeek = (minDate - Date.now()) < 1000 * 60 * 60 * 24 * 7

            // Update fixtures results from API-football data if last update happened more than 30minutes ago, first game of matchweek is in less than 1 week and last game of matchweek was over for less than 2 days.
            const fixtureUpdates = fixtures.map(fixture => new Date(fixture.lastScoreUpdate).getTime())
            const lastUpdate = Math.max(...fixtureUpdates)
            setLastScoresUpdated(lastUpdate)

            const fixturesOverForLessThanTwoDays = (Date.now() - maxDate) < 1000 * 60 * 60 * 24 * 2
            const fixturesUpdatedMoreThanThirtyMinutesAgo = Date.now() - lastUpdate > 1000 * 60 * 30

            if (fixturesInLessThanOneWeek && fixturesOverForLessThanTwoDays && fixturesUpdatedMoreThanThirtyMinutesAgo && !scoresUpdated && (user.role === 'SUPER GEEK' || user.role === 'GEEK ADMIN')) {
                setScoresUpdated(true)
                fetchStatus()
                setLastScoresUpdated(Date.now())
            }

            // Update fixtures odds from API-football data if last update happened more than a day ago, first game of matchweek is in less than 1 week and last game of matchweek hasn't started yet
            const fixtureOddsUpdates = fixtures.map(fixture => new Date(fixture.lastOddsUpdate).getTime())
            const lastOddsUpdate = Math.max(...fixtureOddsUpdates)
            setLastOddsUpdated(lastOddsUpdate)

            const allFixturesStarted = Date.now() - maxDate > 0
            const oddsUpdatedMoreThanOneDayAgo = Date.now() - lastOddsUpdate > 1000 * 60 * 60 * 24

            if (fixturesInLessThanOneWeek && !allFixturesStarted && oddsUpdatedMoreThanOneDayAgo && !oddsUpdated && (user.role === 'SUPER GEEK' || user.role === 'GEEK ADMIN')) {
                setOddsUpdated(true)
                fetchOdds()
                setLastOddsUpdated(Date.now())
            }
        }

    }, [fixtures, scoresUpdated, oddsUpdated, matchweekNumber, seasonID, user])

    useEffect(() => {

        const setPoints = user => {
            const seasonUser = user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0]
            const matchweekUser = seasonUser.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())[0]
            setMatchweekPoints(matchweekUser.totalPoints)
            setMatchweekBonus(matchweekUser.bonusPoints)
            setMatchweekCorrects(matchweekUser.numberCorrects)
        }

        const updateProfile = async (season, matchweek) => {
            await updateProfileWithSeason(season)
            await updateProfileWithMatchweek(season, matchweek)
        }
        const setNewUser = async () => {
            await updateProfile(seasonID, matchweekNumber)
            const user = await getProfile()
            loginUser(user)
            setPoints(user)
        }
        setNewUser()

        const fetchSeason = async seasonID => {
            const season = await getSeasonData(seasonID)
            setSeason(season)
        }
        fetchSeason(seasonID)

        fetchFixtures(seasonID, matchweekNumber)

    }, [matchweekNumber, seasonID])

    const previousPage = () => {
        setFixtures(null)
        history.push(`/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) - 1}`)
    }

    const nextPage = () => {
        setFixtures(null)
        history.push(`/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) + 1}`)
    }

    return !fixtures || !season || loading ? (
        <div className='pronogeeks-bg'>
            <div className='loader-container'>
                <Space size='large'>
                    <Spin size='large' tip='Chargement de la page...' style={{ color: 'rgb(4, 78, 199)', fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: 'rgb(4, 78, 199)', fontSize: '3rem', marginBottom: 8 }} />} />
                </Space>
            </div>
        </div>
    ) : (
            <div className='pronogeeks-bg matchweek-page'>
                {user.role === 'GEEK ADMIN' && <div>
                    <button className='btn my-btn admin-btn top' onClick={getStatus}>Actualiser les scores</button>
                    <button className='btn my-btn admin-btn top' onClick={getOdds}>Actualiser les cotes</button>
                </div>}
                <h2>
                    <svg onClick={() => setShowRules(!showRules)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(4, 78, 199)" width="40px" height="40px"><path d="M0 0h24v24H0z" fill="none" /><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg>
                    {season.leagueName} saison {season.year} :<br />
                    journée {matchweekNumber}
                </h2>
                <ul onClick={() => setShowRules(false)} className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
                    <div className='previous-next-btns'>

                        {parseInt(matchweekNumber) !== 1 && <div><button className='btn my-btn' onClick={previousPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg></button></div>}

                        {matchweekBonus > 0 && <div className='score-top'>Ton total J{matchweekNumber} : {matchweekPoints} pts<br />dont {matchweekBonus} pts bonus ({matchweekCorrects}/10)</div>}
                        {!matchweekBonus && <div className='score-top'>Ton total J{matchweekNumber} : {matchweekPoints} pts</div>}

                        {parseInt(matchweekNumber) !== 38 && <div><button className='btn my-btn' onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></button></div>}

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
                {user.role === 'GEEK ADMIN' && <div>
                    <button className='btn my-btn admin-btn' onClick={getStatus}>Actualiser les scores</button>
                    <button className='btn my-btn admin-btn' onClick={getOdds}>Actualiser les cotes</button>
                </div>}
                {showRules && <div className='rules-box'>
                    <span onClick={(() => setShowRules(false))}>X</span>
                    <h4>Règles des pronogeeks :</h4>
                    <hr />
                    <ul>
                        <li>Les statuts et résultats des matchs sont actualisés en moyenne toutes les 30 minutes (à partir de 7 jours avant le début de la journée) et les points de pronogeeks avec. (dernière mise à jour le {dateTransform(lastScoresUpdated)})</li><br />
                        <li>Les cotes sont actualisées une fois par jour (à partir de 7 jours avant le début de la journée). Une fois un match commencé, ses cotes ne changent plus. (dernière mise à jour le {dateTransform(lastOddsUpdated)})</li><br />
                        <li>Il n'est plus possible de changer son pronogeek après le coup d'envoi.</li><br />
                        <li>Un pronogeek <b>correct</b> (bon vainqueur ou match nul) rapporte le nombre de points indiqués dans les cotes de la rencontre.</li><br />
                        <li>Un pronogeek <b>exact</b> (score exact bien pronogeeké) rapporte le double de la cote correspondante.</li><br />
                        <li>Un pronogeek correct sur un match de son <b>équipe de coeur</b> (qu'elle soit gagnante ou perdante) rapporte 30 points bonus.</li><br />
                        <li>Détail des bonus par journée de {season.leagueName} :
                        <ul>
                                <li>Moins de 5 pronos corrects : 0pt bonus</li>
                                <li>5 pronos corrects: 50pts bonus</li>
                                <li>6 pronos corrects: 100pts bonus</li>
                                <li>7 pronos corrects: 200pts bonus</li>
                                <li>8 pronos corrects: 300pts bonus</li>
                                <li>9 pronos corrects: 500pts bonus</li>
                                <li>10 pronos corrects: 700pts bonus</li>
                            </ul>
                        </li>
                    </ul>
                </div>}
            </div>

        )
}

export default Pronogeeks
