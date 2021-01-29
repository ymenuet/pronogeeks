import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProfileWithMatchweek, updateProfileWithSeason } from '../services/user'
import { updateFixturesStatus, updateOdds } from '../services/apiFootball'
import { getProfile } from '../services/auth'
import { Fixture, Loader, MatchweekNavigation, AdminButtons, RulesProno, InputMatchweek } from '../components'
import { openNotification, resetMatchweek, getUserSeasonFromProfile, getUserMatchweekFromProfile, isConnected } from '../helpers'
import { Context } from '../context'
import { QuestionIcon, SaveIcon, RankingIcon } from '../components/Icons'
import '../styles/pronogeeks.css'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID } }, history, loading, user }) => {
    const [season, setSeason] = useState(null)
    const [newSeason, setNewSeason] = useState(true)
    const [userMatchweek, setUserMatchweek] = useState(null)
    const [fixtures, setFixtures] = useState(null)
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)
    const [showRules, setShowRules] = useState(false)
    const [scoresUpdated, setScoresUpdated] = useState(false)
    const [oddsUpdated, setOddsUpdated] = useState(false)
    const [lastOddsUpdated, setLastOddsUpdated] = useState(null)
    const [lastScoresUpdated, setLastScoresUpdated] = useState(null)
    const [saveAll, setSaveAll] = useState(false)
    const [showLeaguePronos, setShowLeaguePronos] = useState(false)
    const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber)

    const { loginUser } = useContext(Context)

    const setMatchweekFixtures = (season, matchweekNumber) => {
        setFixtures(null)
        const fixtures = season.fixtures
            .filter(fixture => `${fixture.matchweek}` === matchweekNumber)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        setFixtures(fixtures)
    }

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
            }
            else setNewSeason(false)
        }
    }, [history, seasonID, user, newSeason])

    useEffect(() => {

        const fetchStatus = async () => {
            const { fixtures } = await updateFixturesStatus(seasonID, matchweekNumber)
            if (fixtures) {
                setFixtures(null)
                setFixtures(fixtures)
                openNotification('success', 'Scores et dates actualisés')
                const user = await getProfile()
                loginUser(user)
                setPoints(userMatchweek)
            }
        }

        const fetchOdds = async () => {
            await updateOdds(seasonID, matchweekNumber)
            setMatchweekFixtures(season, matchweekNumber)
            openNotification('success', 'Cotes actualisées')
        }

        if (!newSeason && fixtures && userMatchweek) {
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

    }, [fixtures, scoresUpdated, oddsUpdated, matchweekNumber, seasonID, user, userMatchweek, newSeason])

    useEffect(() => {

        const updateProfile = async (season, matchweek) => {
            await updateProfileWithSeason(season)
            await updateProfileWithMatchweek(season, matchweek)
        }

        const setUserDataAndSeasonAndFixtures = async user => {
            let updatedUser = user
            let userSeason = getUserSeasonFromProfile(user, seasonID)
            if (!userSeason) {
                await updateProfile(seasonID, matchweekNumber)
                updatedUser = await getProfile()
                loginUser(updatedUser)
                userSeason = getUserSeasonFromProfile(updatedUser, seasonID)
            }
            let userMatchweek = getUserMatchweekFromProfile(userSeason, matchweekNumber)
            if (!userMatchweek) {
                await updateProfileWithMatchweek(seasonID, matchweekNumber)
                updatedUser = await getProfile()
                loginUser(updatedUser)
                const newUserSeason = getUserSeasonFromProfile(updatedUser, seasonID)
                userMatchweek = getUserMatchweekFromProfile(newUserSeason, matchweekNumber)
            }
            setUserMatchweek(userMatchweek)
            setSeason(userSeason.season)
            setMatchweekFixtures(userSeason.season, matchweekNumber)
            setPoints(userMatchweek)
        }
        if (isConnected(user) && !newSeason) setUserDataAndSeasonAndFixtures(user)

    }, [matchweekNumber, seasonID, user, newSeason])

    const saveAllPronos = () => {
        const fixtureDates = fixtures.map(fixture => new Date(fixture.date).getTime())
        const maxDate = Math.max(...fixtureDates)
        if (maxDate < Date.now()) return openNotification('warning', 'Pronos terminés pour cette journée.')
        setSaveAll(true)
        setTimeout(() => setSaveAll(false), 1000)
    }

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

    return !fixtures || !season || !userMatchweek || loading || newSeason ? (

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
                        onClick={saveAllPronos}
                        className='btn my-btn save-all-btn'
                    >
                        <SaveIcon size='40px' />
                        &nbsp;
                        <span>Enregistrer tout</span>
                    </button>

                    <div className='save-all-info'>
                        <p>Enregistrer tous les pronos de la journée.</p>
                    </div>

                </div>

                <AdminButtons
                    season={season}
                    matchweekNumber={matchweekNumber}
                    userMatchweek={userMatchweek}
                    setFixtures={setFixtures}
                    setPoints={setPoints}
                    setMatchweekFixtures={setMatchweekFixtures}
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
                                saveAll={saveAll}
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
                    userMatchweek={userMatchweek}
                    setFixtures={setFixtures}
                    setPoints={setPoints}
                    setMatchweekFixtures={setMatchweekFixtures}
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
    user: state.authReducer.user
})

export default connect(mapStateToProps)(Pronogeeks)
