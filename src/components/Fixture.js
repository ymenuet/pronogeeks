import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { savePronogeeks } from '../services/pronogeeks'
import { Skeleton } from 'antd'
import { Context } from '../context'
import { openNotification, dateTransform, statusTranform } from '../helpers'
import { getProfile } from '../services/auth'
import SavePronoButton from './SavePronoButton'
import PreviewPronos from './PreviewPronos'
import { FavTeamIcon } from '../components/Icons'
import '../styles/fixture.css'

const Fixture = ({ user, fixture, saveAll, showLeaguePronos, setShowLeaguePronos, userPronogeeks }) => {
    const [pronogeek, setPronogeek] = useState(null)
    const [matchStarted, setMatchStarted] = useState(false)
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [showLeagues, setShowLeagues] = useState(false)
    const { loginUser } = useContext(Context)

    const saveProno = async (bool = true, time = 4500) => {
        setSaveSuccess(false)

        // Error message if someone takes out the "disabled" property of a passed game to change their pronostics
        if (matchStarted) return openNotification('error', 'Erreur', 'Ce match est déjà commencé ou fini. Tu ne peux plus changer ton prono.')

        // Warning message if one of the inputs doesn't have a number
        if (
            (!homeScore && parseInt(homeScore) !== 0) ||
            (!awayScore && parseInt(awayScore) !== 0)
        ) return openNotification('warning', 'Attention', `Tu n'as pas défini de score pour le match ${fixture.homeTeam.name} - ${fixture.awayTeam.name}. Prono non enregistré.`)

        let error = false
        setSaving(true)
        await savePronogeeks(homeScore, awayScore, fixture._id).catch(err => {
            openNotification('warning', 'Attention', err.response.data.message.fr)
            error = true
            setSaving(false)
        })
        if (!error) {
            if (bool) openNotification('success', 'Enregistré', `Pronogeek enregistré pour ${fixture.homeTeam.name} - ${fixture.awayTeam.name}`)
            setSaving(false)
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), time)
            const user = await getProfile()
            loginUser(user)
        }
    }

    useEffect(() => {
        let pronogeek = { homeProno: '', awayProno: '' }
        const { _id, season, matchweek } = fixture
        if (userPronogeeks[`${season}-${matchweek}`] && userPronogeeks[`${season}-${matchweek}`][_id]) pronogeek = userPronogeeks[`${season}-${matchweek}`][_id]
        setPronogeek(pronogeek)
        setHomeScore(pronogeek.homeProno)
        setAwayScore(pronogeek.awayProno)
    }, [fixture, userPronogeeks])

    useEffect(() => {
        if (
            new Date(fixture.date) - Date.now() < 0 &&
            fixture.statusShort !== 'PST'
        ) setMatchStarted(true)
    }, [fixture])

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
                        Tu as scoré {pronogeek.points}pts,<br />
                        avec bonus {pronogeek.exact && 'score exact (cote*2)'}{pronogeek.exact && <br />}
                        {pronogeek.exact && 'et'} 30pts équipe de <FavTeamIcon size='24px' />
                    </div>
                )}

                {pronogeek.points > 0 && !pronogeek.bonusFavTeam && (
                    <div className='points-cell'>
                        Tu as scoré {pronogeek.points}pts{pronogeek.exact && ','}{pronogeek.exact && <br />}
                        {pronogeek.exact && `avec bonus score exact (cote*2)`}
                    </div>
                )}

                {pronogeek.points === 0 && pronogeek.addedToProfile && (
                    <div className='points-cell'>
                        Dommage, mauvais prono...
                    </div>
                )}

                {showLeagues && <PreviewPronos
                    user={user}
                    fixture={fixture}
                    setShowLeagues={setShowLeagues}
                />}


            </div>
        )
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    userPronogeeks: state.pronogeekReducer.userPronogeeks
})

export default connect(mapStateToProps)(Fixture)
