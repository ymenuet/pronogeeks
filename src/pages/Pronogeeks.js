import React, { useState, useEffect, useContext } from 'react'
import { getMatchweekFixtures, getSeasonData } from '../services/seasons'
import { updateProfileWithMatchweek, updateProfileWithSeason } from '../services/user'
import { updateFixturesStatus, updateOdds } from '../services/apiFootball'
import { getProfile } from '../services/auth'
import { Fixture, Loader, MatchweekNavigation, AdminButtons } from '../components'
import { openNotification, dateFormatterForRulesPanel } from '../helpers'
import { Context } from '../context'
import { QuestionIcon, SaveIcon } from '../components/Icons'

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
    const [saveAll, setSaveAll] = useState(false)
    const [showLeaguePronos, setShowLeaguePronos] = useState(false)

    const { loginUser, user } = useContext(Context)

    const fetchFixtures = async (season, matchweek) => {
        const fixtures = await getMatchweekFixtures(season, matchweek)
        fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        setFixtures(null)
        setFixtures(fixtures)
        return true
    }

    const setPoints = user => {
        const seasonUser = user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0]
        const matchweekUser = seasonUser.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())[0]
        setMatchweekPoints(matchweekUser.totalPoints)
        setMatchweekBonus(matchweekUser.bonusPoints)
        setMatchweekCorrects(matchweekUser.numberCorrects)
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
            if (fixtures) {
                setFixtures(null)
                setFixtures(fixtures)
                openNotification('success', 'Scores et dates actualisés')
                const user = await getProfile()
                loginUser(user)
                setPoints(user)
            }
        }

        const fetchOdds = async () => {
            await updateOdds(seasonID, matchweekNumber)
            const updated = await fetchFixtures(seasonID, matchweekNumber)
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

    const saveAllPronos = () => {
        const fixtureDates = fixtures.map(fixture => new Date(fixture.date).getTime())
        const maxDate = Math.max(...fixtureDates)
        if (maxDate < Date.now()) return openNotification('warning', 'Pronos terminés pour cette journée.')
        setSaveAll(true)
        setTimeout(() => setSaveAll(false), 1000)
    }

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
            <Loader color='rgb(4, 78, 199)' />
        </div>

    ) : (
            <div className='pronogeeks-bg matchweek-page'>

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
                    seasonID={seasonID}
                    matchweekNumber={matchweekNumber}
                    setFixtures={setFixtures}
                    setPoints={setPoints}
                    fetchFixtures={fetchFixtures}
                />

                <h2>
                    <QuestionIcon onClick={() => setShowRules(!showRules)} />
                    {season.leagueName} saison {season.year} :<br />
                    journée {matchweekNumber}
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
                                fixtureID={fixture._id}
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
                    seasonID={seasonID}
                    matchweekNumber={matchweekNumber}
                    setFixtures={setFixtures}
                    setPoints={setPoints}
                    fetchFixtures={fetchFixtures}
                />

                {showRules && <div className='rules-box'>

                    <span onClick={(() => setShowRules(false))}>X</span>
                    <h4>Règles des pronogeeks :</h4>
                    <hr />
                    <ul>
                        <li>Les statuts et résultats des matchs sont actualisés en moyenne toutes les 30 minutes (à partir de 7 jours avant le début de la journée) et les points de pronogeeks avec. (dernière mise à jour le {dateFormatterForRulesPanel(lastScoresUpdated)})</li><br />
                        <li>Les cotes sont actualisées une fois par jour (à partir de 7 jours avant le début de la journée). À partir de 30 minutes avant le début d'un match, ses cotes ne changent plus. (dernière mise à jour le {dateFormatterForRulesPanel(lastOddsUpdated)})</li><br />
                        <li>Il n'est plus possible de changer son pronogeek après le coup d'envoi.</li><br />
                        <li>Un pronogeek <b>correct</b> (bon vainqueur ou match nul) rapporte le nombre de points indiqués dans les cotes de la rencontre.</li><br />
                        <li>Un pronogeek <b>exact</b> (score exact bien pronogeeké) rapporte le double de la cote correspondante.</li><br />
                        <li>Un pronogeek correct sur un match de son <b>équipe de coeur</b> (qu'elle soit gagnante ou perdante) rapporte 30 points bonus.</li><br />
                        <li>Détail des bonus par journée de {season.leagueName} :
                        <table className='bonus-table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Pronos corrects</th>
                                        <th>Pronos exacts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{'< 3'}</td>
                                        <td>+0pt</td>
                                        <td>+0pt</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>+0pt</td>
                                        <td>+50pts</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>+0pt</td>
                                        <td>+100pts</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>+50pts</td>
                                        <td>+200pts</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>+100pts</td>
                                        <td>+300pts</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>+200pts</td>
                                        <td>+500pts</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>+300pts</td>
                                        <td>+700pts</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>+500pts</td>
                                        <td>+1000pts</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>+700pts</td>
                                        <td>+1500pts</td>
                                    </tr>
                                </tbody>
                            </table>
                            Exemple : Si un geek a 7 pronos corrects (+200pts) dont 4 pronos exacts (+100pts) sur une même journée, il prend 300 points bonus sur cette journée.
                        </li>
                    </ul>

                </div>}

            </div>

        )
}

export default Pronogeeks
