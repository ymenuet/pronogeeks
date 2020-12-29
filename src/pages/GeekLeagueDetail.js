import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import { getSeasonData, getMatchweekFixtures } from '../services/seasons'
import { fetchLeague } from '../services/geekLeague'
import { Loader, InputMatchweek, RankGeeks } from '../components'
import { matchFinished, resetMatchweek } from '../helpers'
import { GoBackIcon, GoNextIcon } from '../components/Icons'
import '../styles/detailGeekleague.css'

const GeekLeagueDetail = ({ match: { params: { geekLeagueID, seasonID, matchweekNumber } }, loading }) => {
    const { user } = useContext(Context)
    const [season, setSeason] = useState(null)
    const [matchweek, setMatchweek] = useState(parseInt(matchweekNumber))
    const [lastMatchweek, setLastMatchweek] = useState(null)
    const [geekLeague, setGeekLeague] = useState(null)
    const [totalGames, setTotalGames] = useState(null)
    const [gamesFinished, setGamesFinished] = useState(null)
    const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber)

    useEffect(() => {
        const setNextMatchweek = async (seasonID) => {
            const season = await getSeasonData(seasonID)
            setSeason(season)
            const lastFixtures = season.fixtures.filter(fixture => new Date(fixture.date).getTime() < Date.now())
            if (lastFixtures.length > 0) {
                const lastMatchweek = lastFixtures[lastFixtures.length - 1].matchweek
                if (!matchweekNumber) setMatchweek(lastMatchweek)
                setLastMatchweek(lastMatchweek)
            } else {
                if (!matchweekNumber) setMatchweek(1)
                setLastMatchweek(1)
            }
        }
        setNextMatchweek(seasonID)

        const getGeekLeague = async (geekLeagueID) => {
            const geekLeague = await fetchLeague(geekLeagueID)
            setGeekLeague(geekLeague)
        }
        getGeekLeague(geekLeagueID)
    }, [geekLeagueID, seasonID, matchweekNumber])

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

    const resetComponent = () => {
        setMatchweek(null)
        setTotalGames(null)
        setGamesFinished(null)
    }

    const previousMatchweek = () => {
        resetComponent()
        setMatchweek(matchweek - 1)
    }

    const nextMatchweek = () => {
        resetComponent()
        setMatchweek(matchweek + 1)
    }

    const changeMatchweek = matchweek => {
        resetComponent()
        setMatchweek(parseInt(matchweek))
    }

    return <div
        className='geekleague-bg geekleague-details'
        onClick={e => resetMatchweek(e, matchweekFromInput, matchweek, setMatchweekFromInput)}
    >

        {loading || !geekLeague || !matchweek || !season || !lastMatchweek ? (

            <Loader />

        ) : (

                <div className='container'>

                    <div className='row'>

                        <div className='ranking-geekleague-matchweek-container col-10 offset-1 col-lg-6 offset-lg-3'>

                            <Link to={`/myGeekleagues/${geekLeagueID}`} className='return-button'>
                                <GoBackIcon size='18px' />
                            &nbsp;Retour classement saison
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
                                            J<InputMatchweek
                                                matchweekInit={matchweek}
                                                matchweekFromInput={matchweekFromInput}
                                                setMatchweekFromInput={setMatchweekFromInput}
                                                changeMatchweek={changeMatchweek}
                                                lastMatchweek={lastMatchweek}
                                                backgroundColor='rgb(156, 0, 99)'
                                            /> {season.leagueName} {season.year}
                                            <br />
                                            {gamesFinished === null || totalGames === null ? <small>
                                                Match joués :&nbsp;&nbsp;
                                                <Loader
                                                    size='small'
                                                    tip={null}
                                                    fontSize='1.6rem'
                                                    container={false}
                                                    style={{ display: 'inline' }}
                                                />
                                            </small> :
                                                <small>{gamesFinished === totalGames ? 'Journée terminée' : `Matchs joués : ${gamesFinished}/${totalGames}`}</small>}
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

                                <RankGeeks
                                    user={user}
                                    players={geekLeague.geeks}
                                    seasonID={seasonID}
                                    matchweek={matchweek}
                                />

                            </div>

                        </div>

                    </div>

                </div>
            )}
    </div>
}

export default GeekLeagueDetail
