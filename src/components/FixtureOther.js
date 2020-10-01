import React, { useState, useEffect } from 'react'
import { getFixture } from '../services/fixtures'
import { getUser } from '../services/user'
import { Skeleton } from 'antd'

const Fixture = ({ fixtureID, geekID }) => {
    const [fixture, setFixture] = useState(null)
    const [pronogeek, setPronogeek] = useState(null)
    const [matchStarted, setMatchStarted] = useState(false)
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(geekID)
            setUser(user)
        }
        fetchUser()
    }, [geekID])

    useEffect(() => {
        if (user && user.seasons.length > 0) {
            const fetchFixturesAndOdds = async (fixtureID) => {
                const fixture = await getFixture(fixtureID)
                const seasonID = fixture.season
                const matchweekNumber = fixture.matchweek
                if (new Date(fixture.date) - Date.now() < 0) setMatchStarted(true)
                setFixture(fixture)
                let season = user.seasons.filter(season => season.season._id === seasonID)
                if (season.length > 0) season = season[0]
                let pronogeek = { homeProno: '', awayProno: '' };
                let pronogeekFound = [];
                let matchweekIndex = 0;
                if (season.matchweeks.length > 0) {
                    season.matchweeks.forEach((matchweek, i) => {
                        if (matchweek.number.toString() === matchweekNumber.toString()) matchweekIndex = i
                    })
                    if (season.matchweeks[matchweekIndex].pronogeeks.length > 0) pronogeekFound = season.matchweeks[matchweekIndex].pronogeeks.filter(pronogeek => pronogeek.fixture === fixtureID)
                }
                if (pronogeekFound.length > 0) pronogeek = pronogeekFound[0]
                setPronogeek(pronogeek)
                setHomeScore(pronogeek.homeProno)
                setAwayScore(pronogeek.awayProno)
            }
            fetchFixturesAndOdds(fixtureID)
        }
    }, [fixtureID, user])

    const dateTransform = (date) => {
        date = new Date(date)
        let weekDay = date.getDay()
        let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
        switch (weekDay) {
            case 0:
                weekDay = 'dimanche'
                break
            case 1:
                weekDay = 'lundi'
                break;
            case 2:
                weekDay = 'mardi'
                break;
            case 3:
                weekDay = 'mercredi'
                break
            case 4:
                weekDay = 'jeudi'
                break;
            case 5:
                weekDay = 'vendredi'
                break;
            case 6:
                weekDay = 'samedi'
                break;
            default:
                weekDay = ''
        }
        return { fullDate: `${weekDay} ${date.getDate()}/${month}/${date.getFullYear()}`, fullTime: `${date.getHours()}h${minutes}` }
    }

    const statusTranform = (statusShort, minutes) => {
        if (statusShort !== 'TBD' &&
            statusShort !== 'NS' &&
            statusShort !== '1H' &&
            statusShort !== 'HT' &&
            statusShort !== '2H' &&
            statusShort !== 'ET' &&
            statusShort !== 'P' &&
            statusShort !== 'BT' &&
            statusShort !== 'SUSP' &&
            statusShort !== 'INT' &&
            statusShort !== 'PST') {
            return 'Match terminé'
        } else if (statusShort === 'HT') {
            return 'Mi-temps'
        } else return `${minutes}'`

    }


    return !fixture || homeScore == null || awayScore == null ? (
        <div style={{ padding: 20, paddingTop: 0 }}>
            <Skeleton active />
        </div>
    ) : (
            <div className='fixture-line'>
                <table>
                    <thead>
                        <tr>
                            <th><img src={fixture.homeTeam.logo} alt="logo" className='team-logo' /></th>
                            <th><small>{fixture.homeTeam.stadium}<br />{dateTransform(fixture.date).fullDate}<br />à {dateTransform(fixture.date).fullTime}</small></th>
                            <th><img src={fixture.awayTeam.logo} alt="logo" className='team-logo' /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='score-teams-row'>
                            <td className='team-name'>{fixture.homeTeam.name}</td>
                            <td className='score-fixture'>{fixture.goalsHomeTeam} - {fixture.goalsAwayTeam}</td>
                            <td className='team-name'>{fixture.awayTeam.name}</td>
                        </tr>
                        {fixture.timeElapsed && <tr className='pb-1'>
                            <td></td>
                            <td className='fixture-status'>{statusTranform(fixture.statusShort, fixture.timeElapsed)}</td>
                            <td></td>
                        </tr>}
                        <tr className='odds-section odds-top'>
                            <td>Cote domicile :</td>
                            <td>Cote nul :</td>
                            <td>Cote extérieur :</td>
                        </tr>
                        <tr className='odds-section odds-bottom'>
                            <td>{fixture.oddsWinHome}</td>
                            <td>{fixture.oddsDraw}</td>
                            <td>{fixture.oddsWinAway}</td>
                        </tr>
                        {matchStarted && <tr className='prono-section'>
                            <td className='prono-input-col'><label>Buts domicile :</label><input className='prono-input' type="number" name='homeProno' value={homeScore} placeholder='Prono' disabled={true} /></td>
                            <td className='prono-input-col'>
                                {pronogeek.points > 0 && pronogeek.bonusFavTeam && (
                                    <div style={{ margin: '0 10px' }}>
                                        {user.username} a scoré <i>{pronogeek.points}pts</i> {pronogeek.exact && `(${pronogeek.potentialPoints}*2)`}<br />
                        dont 30 pts bonus pour son équipe de <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=" rgb(253, 0, 7)" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                    </div>
                                )}
                                {pronogeek.points > 0 && !pronogeek.bonusFavTeam && (
                                    <div style={{ margin: '0 10px' }}>
                                        {user.username} a scoré <i>{pronogeek.points}pts</i> {pronogeek.exact && `(${pronogeek.potentialPoints}*2)`}
                                    </div>
                                )}
                                {pronogeek.points === 0 && pronogeek.addedToProfile && (
                                    <div style={{ margin: '0 10px' }}>
                                        Mauvais prono...
                                    </div>
                                )}
                            </td>
                            <td className='prono-input-col'><label>Buts extérieur :</label><input className='prono-input' type="number" name='awayProno' value={awayScore} placeholder='Prono' disabled={true} /></td>
                        </tr>}
                        {!matchStarted && <tr>
                            <td></td>
                            <td>Pronogeek non visible.</td>
                            <td></td>
                        </tr>}
                    </tbody>
                </table>



            </div>
        )
}

export default Fixture
