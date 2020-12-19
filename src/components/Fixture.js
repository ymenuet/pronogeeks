import React, { useState, useEffect, useContext } from 'react'
import { getFixture } from '../services/fixtures'
import { savePronogeeks } from '../services/pronogeeks'
import { Skeleton } from 'antd'
import { Context } from '../context'
import { openNotification, dateTransform, statusTranform } from '../helpers'
import SavePronoButton from './SavePronoButton'
import PreviewPoints from './PreviewPoints'
import { FavTeamIcon } from '../components/Icons'

const Fixture = ({ fixtureID, saveAll, showLeaguePronos, setShowLeaguePronos }) => {
    const [fixture, setFixture] = useState(null)
    const [pronogeek, setPronogeek] = useState(null)
    const [matchStarted, setMatchStarted] = useState(false)
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [showLeagues, setShowLeagues] = useState(false)
    const { user } = useContext(Context)

    const saveProno = async (bool = true, time = 4500) => {
        setSaveSuccess(false)

        // Error message if someone takes out the "disabled" property of a passed game to change their pronostics
        if (
            new Date(fixture.date).getTime() - Date.now() < 0 &&
            fixture.statusShort !== 'PST'
        ) return openNotification('error', 'Erreur', 'Ce match est déjà commencé ou fini. Tu ne peux plus changer ton prono.')

        // Warning message if one of the inputs doesn't have a number
        if (
            (!homeScore && parseInt(homeScore) !== 0) ||
            (!awayScore && parseInt(awayScore) !== 0)
        ) return openNotification('warning', 'Attention', `Tu n'as pas défini de score pour le match ${fixture.homeTeam.name} - ${fixture.awayTeam.name}. Prono non enregistré.`)

        let error = false
        setSaving(true)
        await savePronogeeks(homeScore, awayScore, fixtureID).catch(err => {
            openNotification('warning', 'Attention', err.response.data.message.fr)
            error = true
            setSaving(false)
        })
        if (!error) {
            if (bool) openNotification('success', 'Enregistré', `Pronogeek enregistré pour ${fixture.homeTeam.name} - ${fixture.awayTeam.name}`)
            setSaving(false)
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), time)
        }
    }


    useEffect(() => {
        const fetchFixturesAndOdds = async (fixtureID) => {
            const fixture = await getFixture(fixtureID)
            const seasonID = fixture.season
            const matchweekNumber = fixture.matchweek
            if (
                new Date(fixture.date) - Date.now() < 0 &&
                fixture.statusShort !== 'PST'
            ) setMatchStarted(true)
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
    }, [fixtureID, user])


    useEffect(() => {
        if (
            saveAll &&
            (new Date(fixture.date).getTime() - Date.now() > 0) &&
            (homeScore || parseInt(homeScore) === 0) &&
            (awayScore || parseInt(awayScore) === 0)
        ) saveProno(false, 10000)
    }, [saveAll, awayScore, homeScore, fixture])


    useEffect(() => {
        if (showLeaguePronos && setShowLeagues) {
            setShowLeagues(false)
            setShowLeaguePronos(false)
        }
    }, [showLeaguePronos, setShowLeaguePronos])


    const seeLeaguePronos = () => {
        setShowLeaguePronos(true)
        setTimeout(() => setShowLeagues(!showLeagues), 100)
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
                            <th>
                                <img
                                    src={fixture.homeTeam.logo}
                                    alt="logo"
                                    className='team-logo'
                                />
                            </th>
                            <th>
                                <small>{fixture.homeTeam.stadium}<br />{dateTransform(fixture.date).fullDate}<br />à {dateTransform(fixture.date).fullTime}</small>
                            </th>
                            <th>
                                <img
                                    src={fixture.awayTeam.logo}
                                    alt="logo"
                                    className='team-logo'
                                />
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr className='score-teams-row'>
                            <td className='team-name'>{fixture.homeTeam.name}</td>
                            <td className='score-fixture'>{fixture.goalsHomeTeam} - {fixture.goalsAwayTeam}</td>
                            <td className='team-name'>{fixture.awayTeam.name}</td>
                        </tr>

                        {(fixture.timeElapsed || fixture.statusShort === 'PST') && <tr className='pb-1'>
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

                        <tr className='prono-section'>
                            <td className='prono-input-col'>
                                <label>Buts domicile :</label>
                                <input
                                    className='prono-input'
                                    type="number"
                                    name='homeProno'
                                    value={homeScore}
                                    min={0}
                                    onChange={e => setHomeScore(e.target.value)}
                                    placeholder='Prono'
                                    disabled={matchStarted}
                                />
                            </td>

                            <td className='prono-input-col'>

                                <SavePronoButton
                                    user={user}
                                    saveSuccess={saveSuccess}
                                    matchStarted={matchStarted}
                                    saveProno={saveProno}
                                    saving={saving}
                                    homeScore={homeScore}
                                    awayScore={awayScore}
                                    seeLeaguePronos={seeLeaguePronos}
                                />

                            </td>

                            <td className='prono-input-col'>
                                <label>Buts extérieur :</label>
                                <input
                                    className='prono-input'
                                    type="number"
                                    name='awayProno'
                                    value={awayScore}
                                    min={0}
                                    onChange={e => setAwayScore(e.target.value)}
                                    placeholder='Prono'
                                    disabled={matchStarted}
                                />
                            </td>
                        </tr>

                    </tbody>

                </table>

                {pronogeek.points > 0 && pronogeek.bonusFavTeam && (
                    <div className='points-cell'>
                        Tu as scoré <i>{pronogeek.points}pts</i> {pronogeek.exact && `(${(pronogeek.points - 30) / 2}*2)`}<br />
                        dont 30pts bonus pour ton équipe de <FavTeamIcon size='24px' />
                    </div>
                )}

                {pronogeek.points > 0 && !pronogeek.bonusFavTeam && (
                    <div className='points-cell'>
                        Tu as scoré <i>{pronogeek.points}pts</i> {pronogeek.exact && `(${pronogeek.points / 2}*2)`}
                    </div>
                )}

                {pronogeek.points === 0 && pronogeek.addedToProfile && (
                    <div className='points-cell'>
                        Dommage, mauvais prono...
                    </div>
                )}

                {showLeagues && <div className='view-pronos'>
                    <PreviewPoints
                        user={user}
                        fixture={fixture}
                        setShowLeagues={setShowLeagues}
                    />
                </div>}


            </div>
        )
}

export default Fixture
