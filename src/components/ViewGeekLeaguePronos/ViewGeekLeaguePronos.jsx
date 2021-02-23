import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Loader, ErrorMessage, GeekProno } from '..'
import { isConnected, statusTranform } from '../../helpers/index'
import { handleStateWith2Ids, handleStateWithId } from '../../stateHandlers'
import { CloseIcon } from '../Icons'
import './viewGeekLeaguePronos.css'

import { saveGeekleagueHistory } from '../../actions/geekActions'
import { getLeague } from '../../actions/geekleagueActions'
import { getGeekleagueFixturePronos } from '../../actions/pronogeekActions'

const PreviewPronos = ({ user, fixture, setShowLeagues, geekleagues, geeksFixturePronogeeks, saveGeekleagueHistory, getLeague, getGeekleagueFixturePronos }) => {

    const [geekleague, setGeekLeague] = useState(null)
    const [geeksPronos, setGeeksPronos] = useState(null)
    const [winner, setWinner] = useState(null)
    const [errorPronos, setErrorPronos] = useState(false)
    const [errorGeekLeague, setErrorGeekLeague] = useState(false)


    useEffect(() => {
        if (isConnected(user)) {
            const geekLeagueID = user.geekLeagueHistory || user.geekLeagues[0]._id
            handleStateWithId({
                id: geekLeagueID,
                reducerData: geekleagues,
                action: getLeague,
                setResult: setGeekLeague,
                setError: setErrorGeekLeague
            })
        }
    }, [user, geekleagues, getLeague])


    useEffect(() => {
        if (geekleague && fixture) {
            handleStateWith2Ids({
                id1: fixture._id,
                id2: geekleague._id,
                reducerData: geeksFixturePronogeeks,
                action: getGeekleagueFixturePronos,
                setResult: setGeeksPronos,
                setError: setErrorPronos
            })
        }

    }, [geekleague, fixture, geeksFixturePronogeeks, getGeekleagueFixturePronos])


    const changeLeague = async (e) => {
        const geekLeagueID = e.target.value
        setGeeksPronos(null)
        handleStateWithId({
            id: geekLeagueID,
            reducerData: geekleagues,
            action: getLeague,
            setResult: setGeekLeague,
            setError: setErrorGeekLeague
        })
        saveGeekleagueHistory(geekLeagueID)
    }


    useEffect(() => {
        const winner = determineWinner(fixture.goalsHomeTeam, fixture.goalsAwayTeam)
        setWinner(winner)
    }, [fixture])


    function determineWinner(goalsHome, goalsAway) {
        return goalsHome > goalsAway ? 'Home' :
            goalsHome < goalsAway ? 'Away' :
                'Draw'
    }


    return (

        <div className='view-pronos'>

            <div className='view-pronos-header row'>

                <span onClick={() => setShowLeagues(false)}>
                    <CloseIcon color='rgb(4, 78, 199)' size='30px' />
                </span>

                <div className='view-pronos-choose-league col-12 col-md-4'>


                    <p>Choisis une ligue :&nbsp;</p>

                    <div>

                        <select
                            defaultValue={user?.geekLeagueHistory || user?.geekLeagues[0]._id}
                            onChange={changeLeague}
                        >

                            {user.geekLeagues.map(oneGeekleague =>
                                <option
                                    key={oneGeekleague._id}
                                    value={oneGeekleague._id}
                                >
                                    {oneGeekleague.name}
                                </option>
                            )}

                        </select>


                        <p className='link-to-ranking-matchweek'><Link to={`/myGeekleagues/${geekleague?._id}/season/${fixture.season}/${fixture.matchweek}`}>Classement ligue</Link></p>

                    </div>

                </div>

                <div className='view-pronos-game-info col-12 col-md-8'>

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
                                <th className='score-fixture'>{fixture.goalsHomeTeam} - {fixture.goalsAwayTeam}</th>
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

                            <tr className='team-names'>
                                <td className='team-name'>{fixture.homeTeam.name}</td>
                                <td className='fixture-status'>{(fixture.timeElapsed || fixture.statusShort === 'PST') && statusTranform(fixture.statusShort, fixture.timeElapsed)}</td>
                                <td className='team-name'>{fixture.awayTeam.name}</td>
                            </tr>

                            <tr>
                                <td className={winner === 'Home' ? 'right-prono exact-prono' : ''}>{fixture.oddsWinHome}</td>
                                <td className={winner === 'Draw' ? 'right-prono exact-prono' : ''}>{fixture.oddsDraw}</td>
                                <td className={winner === 'Away' ? 'right-prono exact-prono' : ''}>{fixture.oddsWinAway}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>

            </div>


            <div className={`${!geeksPronos || errorGeekLeague || errorPronos ? 'align-items-center' : ''} view-pronos-body`}>

                {errorGeekLeague || errorPronos ? <ErrorMessage>
                    {errorGeekLeague || errorPronos}
                </ErrorMessage>

                    : !geeksPronos ? <Loader
                        size='small'
                        tip='Chargement des pronos...'
                        fontSize='2.4rem'
                        container={false}
                    />

                        : <ul>
                            {geeksPronos.map(prono =>
                                <GeekProno
                                    key={prono._id}
                                    pronogeek={prono}
                                    fixture={fixture}
                                    winner={winner}
                                    determineWinner={determineWinner}
                                />
                            )}
                        </ul>

                }
            </div>

        </div>

    )
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    geekleagues: state.geekleagueReducer.geekleagues,
    geeksFixturePronogeeks: state.pronogeekReducer.geeksFixturePronogeeks,
})

const mapDispatchToProps = {
    saveGeekleagueHistory,
    getLeague,
    getGeekleagueFixturePronos
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPronos)
