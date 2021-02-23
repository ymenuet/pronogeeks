import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Skeleton } from 'antd'
import { openNotification, dateTransform, statusTranform } from '../../helpers'
import { SavePronoButton, ViewGeekLeaguePronos, ErrorMessage } from '../'
import { FavTeamIcon } from '../Icons'
import './fixture.css'

import * as pronogeekActions from '../../actions/pronogeekActions'

const Fixture = ({ user, fixture, showLeaguePronos, setShowLeaguePronos, userPronogeeks, savePronogeek, resetSaveAndErrorState, handleInputHomeProno, handleInputAwayProno, loadingApi }) => {
    const [pronogeek, setPronogeek] = useState(null)
    const [matchStarted, setMatchStarted] = useState(false)
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [showLeagues, setShowLeagues] = useState(false)
    const [modified, setModified] = useState(false)
    const [errorProno, setErrorProno] = useState(false)

    useEffect(() => {
        let pronogeek = { homeProno: '', awayProno: '' }
        const { _id, season, matchweek } = fixture

        const userMatchweekPronogeeks = userPronogeeks[`${season}-${matchweek}`]
        if (userMatchweekPronogeeks) {

            if (userMatchweekPronogeeks.error) setErrorProno(userMatchweekPronogeeks.error)

            if (userMatchweekPronogeeks[_id]) pronogeek = userMatchweekPronogeeks[_id]
        }

        setPronogeek(pronogeek)
        setHomeScore(parseInt(pronogeek.homeProno) >= 0 ? pronogeek.homeProno : '')
        setAwayScore(parseInt(pronogeek.awayProno) >= 0 ? pronogeek.awayProno : '')
        setModified(pronogeek.modified ? true : false)


    }, [fixture, userPronogeeks])


    useEffect(() => {
        if (pronogeek) {
            if (pronogeek.saving) setSaving(true)

            if (pronogeek.saved) {
                resetSaveAndErrorState(fixture)
                setSaving(false)
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 4000)
                openNotification('success', 'Enregistré', `Pronogeek enregistré pour ${fixture.homeTeam.name} - ${fixture.awayTeam.name}`)
            }

            if (pronogeek.error) {
                resetSaveAndErrorState(fixture)
                setSaving(false)
                openNotification('error', 'Erreur', `Une erreur a eu lieu lors de l'enregistrement du match ${fixture.homeTeam.name} - ${fixture.awayTeam.name}. Réessaye plus tard.`)
            }
        }

    }, [pronogeek, fixture, resetSaveAndErrorState])


    useEffect(() => {
        if (
            new Date(fixture.date) < Date.now() &&
            fixture.statusShort !== 'PST'
        ) setMatchStarted(true)

    }, [fixture])


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


    const saveProno = () => {
        setSaveSuccess(false)

        // Error message if someone takes out the "disabled" property of a passed game to change their pronostics
        if (matchStarted) return openNotification('error', 'Erreur', 'Ce match est déjà commencé ou fini. Tu ne peux plus changer ton prono.')

        // Warning message if one of the inputs doesn't have a number
        if (
            (!homeScore && parseInt(homeScore) !== 0) ||
            (!awayScore && parseInt(awayScore) !== 0)
        ) return openNotification('warning', 'Attention', `Tu n'as pas défini de score pour le match ${fixture.homeTeam.name} - ${fixture.awayTeam.name}. Prono non enregistré.`)

        savePronogeek(homeScore, awayScore, fixture)
    }


    return !fixture || homeScore == null || awayScore == null || loadingApi ? (

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

                        {errorProno ? <ErrorMessage style={{ marginTop: 20 }}>{errorProno}</ErrorMessage>

                            : <tr className='prono-section'>
                                <td className='prono-input-col'>
                                    <label>Buts domicile :</label>
                                    <input
                                        className='prono-input'
                                        type="number"
                                        name='homeProno'
                                        value={homeScore}
                                        min={0}
                                        onChange={e => handleInputHomeProno(e.target.value, fixture)}
                                        placeholder='Prono'
                                        disabled={matchStarted}
                                    />
                                </td>

                                <td className='prono-input-col'>

                                    <SavePronoButton
                                        user={user}
                                        modified={modified}
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
                                        onChange={e => handleInputAwayProno(e.target.value, fixture)}
                                        placeholder='Prono'
                                        disabled={matchStarted}
                                    />
                                </td>
                            </tr>}

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

                {showLeagues && <ViewGeekLeaguePronos
                    fixture={fixture}
                    setShowLeagues={setShowLeagues}
                />}


            </div>
        )
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    userPronogeeks: state.pronogeekReducer.userPronogeeks,
    loadingApi: state.apiFootballReducer.loading
})

const mapDispatchToProps = {
    ...pronogeekActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Fixture)
