import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchLeague } from '../services/geekLeague'
import { Loader, InputMatchweek, RankGeeks } from '../components'
import { matchFinished, resetMatchweek } from '../helpers'
import { GoBackIcon, GoNextIcon } from '../components/Icons'
import '../styles/detailGeekleague.css'

import * as seasonActions from '../actions/seasonActions'

const GeekLeagueDetail = ({ match: { params: { geekLeagueID, seasonID, matchweekNumber } }, loading, loadingSeason, user, detailedSeasons, seasonMatchweeks, lastMatchweeks, nextMatchweeks, getSeason, getMatchweekFixtures, setLastMatchweek, setNextMatchweek, errorSeason }) => {
    const [season, setSeason] = useState(null)
    const [matchweek, setMatchweek] = useState(parseInt(matchweekNumber))
    const [lastMatchweek, setLastMatchweekLocal] = useState(null)
    const [geekLeague, setGeekLeague] = useState(null)
    const [totalGames, setTotalGames] = useState(null)
    const [gamesFinished, setGamesFinished] = useState(null)
    const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber)

    useEffect(() => {
        if (
            !detailedSeasons[seasonID] &&
            !loadingSeason &&
            !errorSeason
        ) getSeason(seasonID)

        else if (detailedSeasons[seasonID]) setSeason(detailedSeasons[seasonID])

    }, [seasonID, loadingSeason, detailedSeasons, getSeason, errorSeason])


    useEffect(() => {
        if (season && !lastMatchweeks[seasonID] && !loadingSeason) setLastMatchweek(season)

        else if (lastMatchweeks[seasonID]) setLastMatchweekLocal(lastMatchweeks[seasonID])

    }, [seasonID, loadingSeason, season, lastMatchweeks, getSeason, setLastMatchweek])


    useEffect(() => {
        if (season && !nextMatchweeks[seasonID] && !loadingSeason) setNextMatchweek(season)

        else if (nextMatchweeks[seasonID] && lastMatchweek) setMatchweek(Math.min(nextMatchweeks[seasonID], lastMatchweek))

    }, [seasonID, loadingSeason, season, nextMatchweeks, lastMatchweek, getSeason, setNextMatchweek])


    useEffect(() => {
        if (matchweek) {
            const fixtures = seasonMatchweeks[`${seasonID}-${matchweek}`]

            if (season && !fixtures && !loadingSeason) getMatchweekFixtures(season, matchweek)

            else if (fixtures) {
                const gamesFinished = fixtures.filter(fixture => matchFinished(fixture.statusShort))
                setTotalGames(fixtures.length)
                setGamesFinished(gamesFinished.length)
            }
        }
    }, [matchweek, seasonID, season, seasonMatchweeks, loadingSeason, getMatchweekFixtures])


    useEffect(() => {
        const getGeekLeague = async (geekLeagueID) => {
            const geekLeague = await fetchLeague(geekLeagueID)
            setGeekLeague(geekLeague)
        }
        getGeekLeague(geekLeagueID)
    }, [geekLeagueID, seasonID, matchweekNumber])


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

const mapStateToProps = state => ({
    user: state.authReducer.user,
    detailedSeasons: state.seasonReducer.detailedSeasons,
    seasonMatchweeks: state.seasonReducer.seasonMatchweeks,
    lastMatchweeks: state.seasonReducer.lastMatchweeks,
    nextMatchweeks: state.seasonReducer.nextMatchweeks,
    loadingSeason: state.seasonReducer.loading,
    errorSeason: state.seasonReducer.error
})

const mapDispatchToProps = {
    ...seasonActions
}

export default connect(mapStateToProps, mapDispatchToProps)(GeekLeagueDetail)
