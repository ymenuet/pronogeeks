import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import { getSeasonData, getMatchweekFixtures } from '../services/seasons'
import { fetchLeague, fetchMatchweekRanking } from '../services/geekLeague'
import { Loader, RankingGeek } from '../components'
import { matchFinished } from '../helpers'
import { GoBackIcon, GoNextIcon } from '../components/Icons'

const GeekLeagueDetail = ({ match: { params: { geekLeagueID, seasonID } }, loading }) => {
    const { user } = useContext(Context)
    const [season, setSeason] = useState(null)
    const [matchweek, setMatchweek] = useState(null)
    const [lastMatchweek, setLastMatchweek] = useState(null)
    const [geekLeague, setGeekLeague] = useState(null)
    const [ranking, setRanking] = useState(null)
    const [totalGames, setTotalGames] = useState(null)
    const [gamesFinished, setGamesFinished] = useState(null)

    useEffect(() => {
        const setNextMatchweek = async (seasonID) => {
            const season = await getSeasonData(seasonID)
            setSeason(season)
            const lastFixtures = season.fixtures.filter(fixture => new Date(fixture.date).getTime() < Date.now())
            if (lastFixtures.length > 0) {
                const lastMatchweek = lastFixtures[lastFixtures.length - 1].matchweek
                setMatchweek(lastMatchweek)
                setLastMatchweek(lastMatchweek)
            } else {
                setMatchweek(1)
                setLastMatchweek(1)
            }
        }
        setNextMatchweek(seasonID)

        const getGeekLeague = async (geekLeagueID) => {
            const geekLeague = await fetchLeague(geekLeagueID)
            setGeekLeague(geekLeague)
        }
        getGeekLeague(geekLeagueID)
    }, [geekLeagueID, seasonID])

    useEffect(() => {
        if (matchweek) {
            const updateRanking = async () => {
                const geeks = await fetchMatchweekRanking(geekLeagueID, seasonID, matchweek)
                setRanking(geeks)
            }
            updateRanking()
        }
    }, [matchweek, geekLeagueID, seasonID])

    useEffect(() => {
        if (matchweek) {
            const fetchMatchweekFixtures = async () => {
                const fixtures = await getMatchweekFixtures(seasonID, matchweek)
                setTotalGames(fixtures.length)
                const gamesFinished = fixtures.filter(fixture => matchFinished(fixture.statusShort))
                setGamesFinished(gamesFinished.length)
            }
            fetchMatchweekFixtures()
        }
    }, [matchweek, seasonID])

    const previousMatchweek = () => {
        setRanking(null)
        setMatchweek(matchweek - 1)
    }

    const nextMatchweek = () => {
        setRanking(null)
        setMatchweek(matchweek + 1)
    }

    return <div className='geekleague-bg geekleague-details'>

        {loading || !geekLeague || !matchweek || !season || !ranking || !lastMatchweek || gamesFinished === null || totalGames === null ? (

            <Loader />

        ) : (

                <div className='container'>

                    <div className='row'>

                        <div className='ranking-geekleague-matchweek-container col-10 offset-1 col-lg-6 offset-lg-3'>

                            <Link to={`/myGeekleagues/${geekLeagueID}`} className='return-button'>
                                <GoBackIcon size='18px' />
                            &nbsp;Retour classement général
                            </Link>


                            <h2>Classement {geekLeague.name}</h2>

                            <div className='ranking-geekleague-matchweek'>

                                <div>
                                    <div className='previous-next-btns geekleague-btns'>

                                        {matchweek > 1 && <div>
                                            <button
                                                className='btn my-btn'
                                                onClick={previousMatchweek}
                                            >
                                                <GoBackIcon />
                                            </button>
                                        </div>}

                                        <h4>
                                            J{matchweek} de {season.leagueName}, saison {season.year}
                                            <br />
                                            <small>{gamesFinished === totalGames ? 'Journée terminée' : `Matchs joués : ${gamesFinished}/${totalGames}`}</small>
                                        </h4>

                                        {matchweek < lastMatchweek && <div>
                                            <button
                                                className='btn my-btn'
                                                onClick={nextMatchweek}
                                            >
                                                <GoNextIcon />
                                            </button>
                                        </div>}

                                    </div>
                                </div>

                                <ul className='list-group list-group-flush geekleague-ranking-detail'>

                                    {ranking.map((geek, index) => <RankingGeek
                                        key={geek._id}
                                        user={user}
                                        geek={geek}
                                        index={index}
                                        seasonID={seasonID}
                                        matchweek={matchweek}
                                    />)}

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>
            )}
    </div>
}

export default GeekLeagueDetail
