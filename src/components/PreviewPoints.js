import React, { useEffect, useState, useContext } from 'react'
import { getProfile } from '../services/auth'
import { saveGeekLeagueHistory } from '../services/user'
import { fetchLeague } from '../services/geekLeague'
import Loader from './Loader'
import GeekProno from './GeekProno'
import { statusTranform } from '../helpers/index'
import { Context } from '../context'
import { CloseIcon } from './Icons'

const PreviewPoints = ({ user, fixture, setShowLeagues }) => {

    const [geekLeague, setGeekLeague] = useState(user.geekLeagueHistory || user.geekLeagues[0]._id)
    const [geekLeagueDetails, setGeekLeagueDetails] = useState(null)
    const [winner, setWinner] = useState(null)

    const { loginUser } = useContext(Context)

    const determineWinner = (goalsHome, goalsAway) => {
        return goalsHome > goalsAway ? 'Home' :
            goalsHome < goalsAway ? 'Away' :
                'Draw'
    }

    useEffect(() => {
        const winner = determineWinner(fixture.goalsHomeTeam, fixture.goalsAwayTeam)
        setWinner(winner)
    }, [fixture])

    useEffect(() => {

        const getLeague = async () => {
            const league = await fetchLeague(geekLeague)
            league.geeks = league.geeks.sort((a, b) => {
                const userA = a.username.toLowerCase()
                const userB = b.username.toLowerCase()
                if (userA >= userB) return 1
                else return -1
            })
            setGeekLeagueDetails(league)
        }
        if (geekLeague) getLeague()

    }, [geekLeague])

    useEffect(() => {
        const fetchProfile = async () => {
            const user = await getProfile()
            loginUser(user)
        }
        fetchProfile()
    }, [geekLeagueDetails])

    const changeLeague = async (e) => {
        const geekLeagueID = e.target.value
        setGeekLeagueDetails(null)
        setGeekLeague(geekLeagueID)
        await saveGeekLeagueHistory(user._id, geekLeagueID)
    }

    return (

        <>

            <div className='view-pronos-header row'>

                <span onClick={() => setShowLeagues(false)}>
                    <CloseIcon color='rgb(4, 78, 199)' size='30px' />
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
