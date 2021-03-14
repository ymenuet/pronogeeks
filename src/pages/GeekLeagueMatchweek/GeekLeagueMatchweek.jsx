import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Loader, InputMatchweek, RankGeeks, ErrorMessage } from '../../components'
import { resetMatchweek } from '../../utils/functions'
import { useSeason, useMatchweekFixtures, useGeekLeague, useLastStartedMatchweek, useSoonerMatchweek } from '../../utils/hooks'
import { GoBackIcon, GoNextIcon } from '../../components/Icons'
import './detailGeekleague.css'

import { setNextMatchweek } from '../../actions/seasonActions'

const GeekLeagueMatchweek = ({ match: { params: { geekLeagueID, seasonID, matchweekNumber } }, loading, loadingSeason, nextMatchweeks, setNextMatchweek }) => {
    const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber)

    const { season, errorSeason } = useSeason(seasonID)

    const { geekLeague, errorGeekLeague } = useGeekLeague(geekLeagueID)

    const lastMatchweek = useLastStartedMatchweek(season)

    const { matchweek, setMatchweek } = useSoonerMatchweek(matchweekNumber, lastMatchweek, season)

    const { totalGames, gamesFinished } = useMatchweekFixtures(season, matchweek)

    const previousMatchweek = () => {
        setMatchweek(matchweek - 1)
    }

    const nextMatchweek = () => {
        setMatchweek(matchweek + 1)
    }

    const changeMatchweek = matchweek => {
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
    lastMatchweeks: state.seasonReducer.lastMatchweeks,
    nextMatchweeks: state.seasonReducer.nextMatchweeks,
    loadingSeason: state.seasonReducer.loading,
})

const mapDispatchToProps = {
    setNextMatchweek
}

export default connect(mapStateToProps, mapDispatchToProps)(GeekLeagueMatchweek)
