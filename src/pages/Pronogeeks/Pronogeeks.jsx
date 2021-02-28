import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Fixture, Loader, MatchweekNavigation, PronosAdminButtons, RulesProno, InputMatchweek, ErrorMessage } from '../../components'
import { useSeason, useUserMatchweek, useConditionalFixturesUpdate } from '../../utils/hooks'
import { openNotification, resetMatchweek, isConnected } from '../../utils/functions'
import { handleStateMatchweekFixtures } from '../../utils/stateHandlers'
import { QuestionIcon, SaveIcon, RankingIcon, ValidateIcon } from '../../components/Icons'
import './pronogeeks.css'

import * as seasonActions from '../../actions/seasonActions'
import * as pronogeekActions from '../../actions/pronogeekActions'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID } }, history, loading, loadingSeason, user, seasonMatchweeks, userPronogeeks, statusUpdated, oddsUpdated, warningMessage, getMatchweekFixtures, getUserMatchweekPronos, saveAllPronogeeks, resetMatchweekSaveAndErrorState }) => {
    const [fixtures, setFixtures] = useState(null)
    const [showRules, setShowRules] = useState(false)
    const [showLeaguePronos, setShowLeaguePronos] = useState(false)
    const [savingAll, setSavingAll] = useState(false)
    const [saveAllSuccess, setSaveAllSuccess] = useState(false)
    const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber)
    const [modifiedTotal, setModifiedTotal] = useState(0)

    const { season, errorSeason } = useSeason(seasonID)

    const { matchweekPoints, matchweekBonus, matchweekCorrects, newSeason } = useUserMatchweek({ seasonID, matchweekNumber, history })

    const { lastScoresUpdated, lastOddsUpdated } = useConditionalFixturesUpdate({ seasonID, matchweekNumber, fixtures, newSeason })


    useEffect(() => {
        if (season) {
            handleStateMatchweekFixtures({
                season,
                matchweekNumber,
                seasonMatchweeks,
                loadingSeason,
                getMatchweekFixtures,
                setFixtures
            })
        }

    }, [matchweekNumber, season, seasonMatchweeks, loadingSeason, getMatchweekFixtures])


    useEffect(() => {
        const pronogeeks = userPronogeeks[`${seasonID}-${matchweekNumber}`]

        if (
            isConnected(user) &&
            !pronogeeks
        ) getUserMatchweekPronos(user._id, seasonID, matchweekNumber)

        else if (
            pronogeeks &&
            Object.keys(pronogeeks).length
        ) {
            const modifiedTotal = Object.values(pronogeeks).reduce((total, currentProno) => {
                if (currentProno.modified) return total + 1
                else return total
            }, 0)
            setModifiedTotal(modifiedTotal)

            if (pronogeeks.saving) setSavingAll(true)

            if (pronogeeks.saved) {
                resetMatchweekSaveAndErrorState(seasonID, matchweekNumber)
                setSavingAll(false)
                setSaveAllSuccess(true)
                setTimeout(() => setSaveAllSuccess(false), 4000)
                openNotification('success', 'Sauvegarde réussie', `Pronogeeks de la journée ${matchweekNumber} enregistrés.`)
            }

            if (pronogeeks.error && pronogeeks.error.type) {
                const { type, title, message } = pronogeeks.error
                resetMatchweekSaveAndErrorState(seasonID, matchweekNumber)
                setSavingAll(false)
                openNotification(type, title, message)
            }

        } else setModifiedTotal(0)

    }, [user, userPronogeeks, seasonID, matchweekNumber, getUserMatchweekPronos, resetMatchweekSaveAndErrorState])


    useEffect(() => {
        if (statusUpdated) openNotification('success', 'Scores et dates actualisés')
    }, [statusUpdated])


    useEffect(() => {
        if (oddsUpdated) openNotification('success', 'Cotes mises à jour')
    }, [oddsUpdated])


    useEffect(() => {
        if (warningMessage) openNotification('warning', 'Actualisation abortée', warningMessage)
    }, [warningMessage])


    const previousPage = () => {
        setFixtures(null)
        history.push(`/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) - 1}`)
    }

    const nextPage = () => {
        setFixtures(null)
        history.push(`/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) + 1}`)
    }

    const changeMatchweek = matchweek => {
        setFixtures(null)
        history.push(`/pronogeeks/${seasonID}/matchweek/${matchweek}`)
    }


    return errorSeason ? (

        <div className='pronogeeks-bg'>
            <ErrorMessage>{errorSeason}</ErrorMessage>
        </div>

    ) : !fixtures || !season || loading || newSeason ? (

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

                    <PronosAdminButtons
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
                            gamesFinished={seasonMatchweeks[`${seasonID}-${matchweekNumber}`].gamesFinished}
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
                            gamesFinished={seasonMatchweeks[`${seasonID}-${matchweekNumber}`].gamesFinished}
                            matchweekBonus={matchweekBonus}
                            previousPage={previousPage}
                            nextPage={nextPage}
                            myClassName='score-bottom'
                        />

                    </ul>

                    <PronosAdminButtons
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
    seasonMatchweeks: state.seasonReducer.seasonMatchweeks,
    loadingSeason: state.seasonReducer.loading,
    userPronogeeks: state.pronogeekReducer.userPronogeeks,
    statusUpdated: state.apiFootballReducer.statusUpdated,
    oddsUpdated: state.apiFootballReducer.oddsUpdated,
    warningMessage: state.apiFootballReducer.warningMessage,
})

const mapDispatchToProps = {
    ...seasonActions,
    ...pronogeekActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pronogeeks)
