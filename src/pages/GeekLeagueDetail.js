import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Loader, InputMatchweek, RankGeeks, ErrorMessage } from '../components'
import { resetMatchweek } from '../helpers'
import { handleStateWithId } from '../stateHandlers'
import { GoBackIcon, GoNextIcon } from '../components/Icons'
import '../styles/detailGeekleague.css'

import * as seasonActions from '../actions/seasonActions'
import * as geekleagueActions from '../actions/geekleagueActions'

const GeekLeagueDetail = ({ match: { params: { geekLeagueID, seasonID, matchweekNumber } }, loading, loadingSeason, user, detailedSeasons, seasonMatchweeks, lastMatchweeks, nextMatchweeks, geekleagues, getSeason, getMatchweekFixtures, setLastMatchweek, getLeague, setNextMatchweek }) => {
    const [season, setSeason] = useState(null)
    const [matchweek, setMatchweek] = useState(parseInt(matchweekNumber))
    const [lastMatchweek, setLastMatchweekLocal] = useState(null)
    const [geekLeague, setGeekLeague] = useState(null)
    const [totalGames, setTotalGames] = useState(null)
    const [gamesFinished, setGamesFinished] = useState(null)
    const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber)
    const [errorSeason, setErrorSeason] = useState(false)
    const [errorGeekLeague, setErrorGeekLeague] = useState(false)


    useEffect(() => {
        handleStateWithId({
            id: seasonID,
            reducerData: detailedSeasons,
            action: getSeason,
            setResult: setSeason,
            setError: setErrorSeason
        })
    }, [seasonID, detailedSeasons, getSeason])


    useEffect(() => {
        handleStateWithId({
            id: geekLeagueID,
            reducerData: geekleagues,
            action: getLeague,
            setResult: setGeekLeague,
            setError: setErrorGeekLeague
        })
    }, [geekLeagueID, geekleagues, getLeague])


    useEffect(() => {
        if (season && !lastMatchweeks[seasonID] && !loadingSeason) setLastMatchweek(season)

        else if (lastMatchweeks[seasonID]) setLastMatchweekLocal(lastMatchweeks[seasonID])

    }, [seasonID, loadingSeason, season, lastMatchweeks, setLastMatchweek])


    useEffect(() => {
        if (season && !nextMatchweeks[seasonID] && !loadingSeason) setNextMatchweek(season)

        else if (nextMatchweeks[seasonID] && lastMatchweek) setMatchweek(Math.min(nextMatchweeks[seasonID], lastMatchweek))

    }, [seasonID, loadingSeason, season, nextMatchweeks, lastMatchweek, setNextMatchweek])


    useEffect(() => {
        if (matchweek) {
            const matchweekDetails = seasonMatchweeks[`${seasonID}-${matchweek}`]

            if (season && !matchweekDetails && !loadingSeason) getMatchweekFixtures(season, matchweek)

            else if (matchweekDetails) {
                const { totalGames, gamesFinished } = matchweekDetails
                setTotalGames(totalGames)
                setGamesFinished(gamesFinished)
            }
        }
    }, [matchweek, seasonID, season, seasonMatchweeks, loadingSeason, getMatchweekFixtures])


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

        {errorGeekLeague || errorSeason ? <ErrorMessage>{errorGeekLeague || errorSeason}</ErrorMessage>

            : loading || !geekLeague || !matchweek || !season || !lastMatchweek ? (

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
                                                        fontSize='1.2rem'
                                                        container={false}
                                                        style={{ display: 'inline' }}
                                                    />
                                                </small> :
                                                    <small className='margin-small'>{gamesFinished === totalGames ? 'Journée terminée' : `Matchs joués : ${gamesFinished}/${totalGames}`}</small>}
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
    geekleagues: state.geekleagueReducer.geekleagues,
})

const mapDispatchToProps = {
    ...seasonActions,
    ...geekleagueActions
}

export default connect(mapStateToProps, mapDispatchToProps)(GeekLeagueDetail)
