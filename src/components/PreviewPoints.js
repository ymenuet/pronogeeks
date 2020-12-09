import React, { useEffect, useState } from 'react'
import { saveGeekLeagueHistory } from '../services/user'
import { fetchLeague } from '../services/geekLeague'
import Loader from './Loader'
import GeekProno from './GeekProno'
import { statusTranform } from '../helpers/index'

const PreviewPoints = ({ user, fixture, setShowLeagues }) => {

    const [geekLeague, setGeekLeague] = useState(user.geekLeagueHistory)
    const [geekLeagueDetails, setGeekLeagueDetails] = useState(null)
    const [winner, setWinner] = useState(null)

    const determineWinner = (goalsHome, goalsAway) => {
        return goalsHome > goalsAway ? 'Home' :
            goalsHome < goalsAway ? 'Away' :
                'Draw'
    }

    useEffect(() => {
        const winner = determineWinner(fixture.goalsHomeTeam, fixture.goalsAwayTeam)
        setWinner(winner)
    }, [])

    useEffect(() => {

        const getLeague = async () => {
            const league = await fetchLeague(geekLeague)
            setGeekLeagueDetails(league)
            await saveGeekLeagueHistory(user._id, league._id)
        }
        if (geekLeague) getLeague()

    }, [geekLeague, user])

    const changeLeague = (e) => {
        setGeekLeagueDetails(null)
        setGeekLeague(e.target.value)
    }

    return (

        <>

            <div className='view-pronos-header row'>

                <span onClick={() => setShowLeagues(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(4, 78, 199)" width="30px" height="30px">
                        <path d="M0 0h24v24H0z" fill="none" /><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                </span>

                <div className='view-pronos-choose-league col-12 col-md-4'>

                    <p>Choisis une ligue :&nbsp;</p>

                    <select
                        defaultValue={geekLeague}
                        onChange={changeLeague}
                    >

                        {user.geekLeagues.map(oneGeekLeague =>
                            <option
                                key={oneGeekLeague._id}
                                value={oneGeekLeague._id}
                            >
                                {oneGeekLeague.name}
                            </option>
                        )}

                    </select>

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


            <div className={`${!geekLeagueDetails ? 'align-items-center' : ''} view-pronos-body`}>
                {!geekLeagueDetails ? <Loader
                    size='small'
                    tip='Chargement des pronos...'
                    fontSize='2.4rem'
                    container={false}
                /> : <ul>
                        {geekLeagueDetails.geeks.map(geek =>
                            <GeekProno
                                key={geek._id}
                                user={geek}
                                fixture={fixture}
                                winner={winner}
                                determineWinner={determineWinner}
                            />
                        )}
                    </ul>

                }
            </div>

        </>

    )
}

export default PreviewPoints
