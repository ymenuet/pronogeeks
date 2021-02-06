import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from './Loader'
import GeekProno from './GeekProno'
import { isConnected, statusTranform } from '../helpers/index'
import { CloseIcon } from './Icons'
import '../styles/previewPronos.css'

import { saveGeekleagueHistory } from '../actions/geekActions'
import { getLeague } from '../actions/geekleagueActions'
import { getGeekleagueFixturePronos } from '../actions/pronogeekActions'

const PreviewPronos = ({ loadingGeekleague, loadingPronogeek, user, fixture, setShowLeagues, geekleagues, geeksFixturePronogeeks, saveGeekleagueHistory, getLeague, getGeekleagueFixturePronos }) => {

    const [geekleague, setGeekleague] = useState(null)
    const [geeksPronos, setGeeksPronos] = useState(null)
    const [winner, setWinner] = useState(null)

    const determineWinner = (goalsHome, goalsAway) => {
        return goalsHome > goalsAway ? 'Home' :
            goalsHome < goalsAway ? 'Away' :
                'Draw'
    }

    const getGeekleague = (geekleagueID, geekleagues, loadingGeekleague, getLeague, setGeekleague) => {
        const geekleague = geekleagues[geekleagueID]
        if (
            !geekleague &&
            !loadingGeekleague
        ) getLeague(geekleagueID)

        else if (geekleague) {
            setGeekleague(geekleague)
        }
    }

    useEffect(() => {
        const winner = determineWinner(fixture.goalsHomeTeam, fixture.goalsAwayTeam)
        setWinner(winner)
    }, [fixture])


    useEffect(() => {
        if (isConnected(user)) {
            const geekleagueID = user.geekLeagueHistory || user.geekLeagues[0]._id
            getGeekleague(geekleagueID, geekleagues, loadingGeekleague, getLeague, setGeekleague)
        }

    }, [user, geekleagues, loadingGeekleague, getLeague])


    useEffect(() => {
        if (geekleague) {
            const geeksPronos = geeksFixturePronogeeks[`${fixture._id}-${geekleague._id}`]

            if (!geeksPronos && !loadingPronogeek) getGeekleagueFixturePronos(geekleague._id, fixture._id)

            else if (geeksPronos) setGeeksPronos(geeksPronos)
        }

    }, [geekleague, fixture, geeksFixturePronogeeks, loadingPronogeek, getGeekleagueFixturePronos])


    const changeLeague = async (e) => {
        const geekleagueID = e.target.value
        setGeekleague(null)
        getGeekleague(geekleagueID, geekleagues, loadingGeekleague, getLeague, setGeekleague)
        saveGeekleagueHistory(geekleagueID)
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
                            defaultValue={geekleague?._id}
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


            <div className={`${!geeksPronos ? 'align-items-center' : ''} view-pronos-body`}>
                {!geeksPronos ? <Loader
                    size='small'
                    tip='Chargement des pronos...'
                    fontSize='2.4rem'
                    container={false}
                /> : <ul>
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
    loadingGeekleague: state.geekleagueReducer.loading,
    errorGeekleague: state.geekleagueReducer.error,
    geeksFixturePronogeeks: state.pronogeekReducer.geeksFixturePronogeeks,
    loadingPronogeek: state.pronogeekReducer.loading,
    errorPronogeek: state.pronogeekReducer.error,
})

const mapDispatchToProps = {
    saveGeekleagueHistory,
    getLeague,
    getGeekleagueFixturePronos
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPronos)
