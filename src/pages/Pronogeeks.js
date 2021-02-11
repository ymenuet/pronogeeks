import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Fixture, Loader, MatchweekNavigation, AdminButtons, RulesProno, InputMatchweek } from '../components'
import { openNotification, resetMatchweek, getUserSeasonFromProfile, getUserMatchweekFromProfile, isConnected, matchFinished } from '../helpers'
import { QuestionIcon, SaveIcon, RankingIcon, ValidateIcon } from '../components/Icons'
import '../styles/pronogeeks.css'

import * as seasonActions from '../actions/seasonActions'
import * as pronogeekActions from '../actions/pronogeekActions'
import * as apiFootballActions from '../actions/apiFootballActions'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID } }, history, loading, loadingSeason, loadingPronogeek, loadingApi, user, detailedSeasons, seasonMatchweeks, userPronogeeks, statusUpdated, oddsUpdated, warningMessage, getSeason, getMatchweekFixtures, getUserMatchweekPronos, saveAllPronogeeks, resetMatchweekSaveAndErrorState, updateFixturesStatus, updateOdds, errorSeason, errorPronogeek, errorApi }) => {
    const [season, setSeason] = useState(null)
    const [newSeason, setNewSeason] = useState(true)
    const [userMatchweek, setUserMatchweek] = useState(null)
    const [fixtures, setFixtures] = useState(null)
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)
    const [showRules, setShowRules] = useState(false)
    const [lastOddsUpdated, setLastOddsUpdated] = useState(null)
    const [lastScoresUpdated, setLastScoresUpdated] = useState(null)
    const [showLeaguePronos, setShowLeaguePronos] = useState(false)
    const [savingAll, setSavingAll] = useState(false)
    const [saveAllSuccess, setSaveAllSuccess] = useState(false)
    const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber)
    const [modifiedTotal, setModifiedTotal] = useState(0)
    const [errorFetch, setErrorFetch] = useState(false)

    const setPoints = userMatchweek => {
        setMatchweekPoints(userMatchweek.totalPoints)
        setMatchweekBonus(userMatchweek.bonusPoints)
        setMatchweekCorrects(userMatchweek.numberCorrects)
    }

    useEffect(() => {
        if (isConnected(user)) {
            const userSeason = getUserSeasonFromProfile(user, seasonID)

            if (!userSeason || !userSeason.favTeam) {
                history.push(`/pronogeeks/${seasonID}`)

            } else {
                setNewSeason(false)
                const userMatchweek = getUserMatchweekFromProfile(userSeason, matchweekNumber)
                if (userMatchweek) {
                    setUserMatchweek(userMatchweek)
                    setPoints(userMatchweek)
                }
            }
        }
    }, [history, seasonID, matchweekNumber, user, newSeason])


    useEffect(() => {
        const seasonDetails = detailedSeasons[seasonID]
        if (
            !seasonDetails &&
            !loadingSeason &&
            !errorSeason
        ) getSeason(seasonID)

        else if (seasonDetails) setSeason(seasonDetails)

    }, [seasonID, matchweekNumber, detailedSeasons, loadingSeason, getSeason, errorSeason])


    useEffect(() => {
        const matchweekDetails = seasonMatchweeks[`${seasonID}-${matchweekNumber}`]

        if (
            season &&
            !matchweekDetails &&
            !loadingSeason &&
            !errorSeason
        ) getMatchweekFixtures(season, matchweekNumber)

        else if (matchweekDetails) setFixtures(matchweekDetails.fixtures)

    }, [seasonID, matchweekNumber, season, seasonMatchweeks, loadingSeason, getMatchweekFixtures, errorSeason])


    useEffect(() => {
        if (
            isConnected(user) &&
            !userPronogeeks[`${seasonID}-${matchweekNumber}`] &&
            !loadingPronogeek &&
            !errorPronogeek
        ) getUserMatchweekPronos(user._id, seasonID, matchweekNumber)

    }, [user, userPronogeeks, loadingPronogeek, seasonID, matchweekNumber, getUserMatchweekPronos, errorPronogeek])


    useEffect(() => {
        const pronogeeks = userPronogeeks[`${seasonID}-${matchweekNumber}`]
        if (
            pronogeeks &&
            Object.keys(pronogeeks).length
        ) {
            const modifiedTotal = Object.values(pronogeeks).reduce((total, currentProno) => {
                if (currentProno.modified) return total + 1
                else return total
            }, 0)
            setModifiedTotal(modifiedTotal)

        } else {
            setModifiedTotal(0)
        }

    }, [userPronogeeks, seasonID, matchweekNumber])


    useEffect(() => {
        const pronogeeks = userPronogeeks[`${seasonID}-${matchweekNumber}`]
        if (pronogeeks) {
            if (pronogeeks.saving) setSavingAll(true)

            if (pronogeeks.saved) {
                resetMatchweekSaveAndErrorState(seasonID, matchweekNumber)
                setSavingAll(false)
                setSaveAllSuccess(true)
                setTimeout(() => setSaveAllSuccess(false), 4000)
                openNotification('success', 'Sauvegarde réussie', `Pronogeeks de la journée ${matchweekNumber} enregistrés.`)
            }

            if (pronogeeks.error) {
                const { type, title, message } = pronogeeks.error
                resetMatchweekSaveAndErrorState(seasonID, matchweekNumber)
                setSavingAll(false)
                openNotification(type, title, message)
            }
        }
    }, [userPronogeeks, seasonID, matchweekNumber, resetMatchweekSaveAndErrorState])


    useEffect(() => {
        if (statusUpdated) openNotification('success', 'Scores et dates actualisés')
    }, [statusUpdated])


    useEffect(() => {
        if (oddsUpdated) openNotification('success', 'Cotes mises à jour')
    }, [oddsUpdated])


    useEffect(() => {
        if (warningMessage) openNotification('warning', 'Actualisation abortée', warningMessage)
    }, [warningMessage])


    useEffect(() => {
        if (errorApi) setErrorFetch(true)
    }, [errorApi])


    useEffect(() => {

        if (isConnected(user) && !newSeason && fixtures && userMatchweek && !loadingApi && !errorApi && !errorFetch) {
            const fixtureDates = fixtures.map(fixture => new Date(fixture.date).getTime())
            const minDate = Math.min(...fixtureDates)
            const maxDate = Math.max(...fixtureDates)
            const fixturesInLessThanOneWeek = (minDate - Date.now()) < 1000 * 60 * 60 * 24 * 7

            const fixtureUpdates = fixtures.map(fixture => new Date(fixture.lastScoreUpdate).getTime())
            const lastUpdate = Math.max(...fixtureUpdates)
            setLastScoresUpdated(lastUpdate)

            const fixtureOddsUpdates = fixtures.map(fixture => new Date(fixture.lastOddsUpdate).getTime())
            const lastOddsUpdate = Math.max(...fixtureOddsUpdates)
            setLastOddsUpdated(lastOddsUpdate)

            if ((user.role === 'SUPER GEEK' || user.role === 'GEEK ADMIN') && fixturesInLessThanOneWeek) {

                // Update fixtures results from API-football data if last update happened more than 30minutes ago, first game of matchweek is in less than 1 week and last game of matchweek was over for less than 2 days.
                const matchweekNotFinished = !!fixtures.filter(({ statusShort }) => !matchFinished(statusShort)).length
                const fixturesUpdatedMoreThanThirtyMinutesAgo = Date.now() > lastUpdate + 1000 * 60 * 30

                if (fixturesUpdatedMoreThanThirtyMinutesAgo && matchweekNotFinished) updateFixturesStatus(seasonID, matchweekNumber)

                // Update fixtures odds from API-football data if last update happened more than a day ago, first game of matchweek is in less than 1 week and last game of matchweek hasn't started yet
                const allFixturesStarted = Date.now() > maxDate - 1000 * 60 * 30
                const oddsUpdatedMoreThanOneDayAgo = Date.now() > lastOddsUpdate + 1000 * 60 * 60 * 24

                if (!allFixturesStarted && oddsUpdatedMoreThanOneDayAgo) updateOdds(seasonID, matchweekNumber)

            }

        }

    }, [fixtures, loadingApi, matchweekNumber, seasonID, user, userMatchweek, newSeason, updateFixturesStatus, updateOdds, errorApi, errorFetch])


    const resetHeader = () => {
        setFixtures(null)
        setMatchweekPoints(null)
        setMatchweekBonus(null)
        setMatchweekCorrects(null)
    }

    const previousPage = () => {
        resetHeader()
        history.push(`/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) - 1}`)
    }

    const nextPage = () => {
        resetHeader()
        history.push(`/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) + 1}`)
    }

    const changeMatchweek = matchweek => {
        resetHeader()
        history.push(`/pronogeeks/${seasonID}/matchweek/${matchweek}`)
    }

    return !fixtures || !season || loading || newSeason ? (

        <div className='pronogeeks-bg'>
            <Loader color='rgb(4, 78, 199)' />
        </div>

    ) : (
            <div
                className='pronogeeks-bg matchweek-page offset-for-btn'
                onClick={e => resetMatchweek(e, matchweekFromInput, matchweekNumber, setMatchweekFromInput)}
            >

                <div className='go-to-ranking'>

                    <Link className='btn my-btn go-to-ranking-btn' to={`/ranking/season/${seasonID}/${matchweekNumber}`}>
                        <RankingIcon size='40px' />
                        &nbsp;
                        <span>{season.provRankingOpen ? 'Faire classement prévisionnel' : `Classement ${season.leagueName}`}</span>
                    </Link>

                    <div className='go-to-ranking-info'>
                        <p>{season.provRankingOpen ? 'Faire mon classement prévisionnel' : `Voir le classement de ${season.leagueName}`}.</p>
                    </div>

                </div>

                <div className='save-all'>

                    <button
                        onClick={() => saveAllPronogeeks(seasonID, matchweekNumber)}
                        className={`btn my-btn save-all-btn ${saveAllSuccess ? 'all-saved' : ''}`}
                        disabled={savingAll}
                    >
                        {modifiedTotal > 0 && <small className='pronos-to-save large-screen-icon'>{modifiedTotal}</small>}
                        {savingAll ? <Loader
                            tip=''
                            fontSize='2.2rem'
                            container={false}
                            className='saving-all-loader'
                        /> :
                            saveAllSuccess ? <ValidateIcon size='40px' /> :
                                <SaveIcon size='40px' />}
                        &nbsp;
                        <span>{modifiedTotal > 0 && <small className='pronos-to-save'>{modifiedTotal}</small>}{savingAll ? 'Enregistrement...' : saveAllSuccess ? 'Enregistré' : 'Enregistrer tout'}</span>

                    </button>

                    <div className='save-all-info'>
                        <p>Enregistrer tous les pronos de la journée.</p>
                    </div>

                </div>

                <AdminButtons
                    season={season}
                    matchweekNumber={matchweekNumber}
                />

                <h2>
                    <QuestionIcon onClick={() => setShowRules(!showRules)} />
                    {season.leagueName} saison {season.year} :<br />
                    journée <InputMatchweek
                        matchweekInit={matchweekNumber}
                        matchweekFromInput={matchweekFromInput}
                        setMatchweekFromInput={setMatchweekFromInput}
                        changeMatchweek={changeMatchweek}
                        lastMatchweek={38}
                        backgroundColor='rgb(4, 78, 199)'
                        fontSize='2rem'
                    />
                </h2>

                <ul
                    onClick={() => setShowRules(false)}
                    className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3"
                >

                    <MatchweekNavigation
                        matchweekNumber={matchweekNumber}
                        matchweekPoints={matchweekPoints}
                        matchweekCorrects={matchweekCorrects}
                        matchweekBonus={matchweekBonus}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        myClassName='score-top'
                    />

                    <div className='list-fixtures-header'>
                        <div className='header-title'>Domicile</div>
                        <div>|</div>
                        <div className='header-title'>Extérieur</div>
                    </div>

                    {fixtures.map(fixture => (
                        <li
                            className="list-group-item"
                            key={fixture._id}
                            style={{ background: 'none' }}
                        >
                            <Fixture
                                fixture={fixture}
                                showLeaguePronos={showLeaguePronos}
                                setShowLeaguePronos={setShowLeaguePronos}
                            />
                        </li>
                    ))}

                    <MatchweekNavigation
                        matchweekNumber={matchweekNumber}
                        matchweekPoints={matchweekPoints}
                        matchweekCorrects={matchweekCorrects}
                        matchweekBonus={matchweekBonus}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        myClassName='score-bottom'
                    />

                </ul>

                <AdminButtons
                    season={season}
                    matchweekNumber={matchweekNumber}
                />

                {showRules && <div className="rules-box">
                    <RulesProno
                        setShowRules={setShowRules}
                        lastScoresUpdated={lastScoresUpdated}
                        lastOddsUpdated={lastOddsUpdated}
                        season={season}
                    />
                </div>}

            </div>

        )
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    detailedSeasons: state.seasonReducer.detailedSeasons,
    seasonMatchweeks: state.seasonReducer.seasonMatchweeks,
    loadingSeason: state.seasonReducer.loading,
    errorSeason: state.seasonReducer.error,
    userPronogeeks: state.pronogeekReducer.userPronogeeks,
    loadingPronogeek: state.pronogeekReducer.loading,
    errorPronogeek: state.pronogeekReducer.error,
    statusUpdated: state.apiFootballReducer.statusUpdated,
    oddsUpdated: state.apiFootballReducer.oddsUpdated,
    warningMessage: state.apiFootballReducer.warningMessage,
    loadingApi: state.apiFootballReducer.loading,
    errorApi: state.apiFootballReducer.error
})

const mapDispatchToProps = {
    ...seasonActions,
    ...pronogeekActions,
    ...apiFootballActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Pronogeeks)
