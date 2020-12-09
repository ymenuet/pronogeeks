import React, { useEffect, useState } from 'react'
import { saveGeekLeagueHistory } from '../services/user'
import { fetchLeague } from '../services/geekLeague'
import Loader from './Loader'
import GeekProno from './GeekProno'
import { statusTranform } from '../helpers/index'

const PreviewPoints = ({ user, fixture }) => {

    const [geekLeague, setGeekLeague] = useState(user.geekLeagueHistory)
    const [geekLeagueDetails, setGeekLeagueDetails] = useState(null)

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

                <div className='view-pronos-choose-league col-12 col-md-4'>

                    <p>Choisis une ligue :&nbsp;</p>

                    <select
                        defaultValue={geekLeague}
                        onChange={changeLeague}
                        style={{ color: 'black' }}
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

                            <tr>
                                <td className='team-name'>{fixture.homeTeam.name}</td>
                                <td className='fixture-status'>{(fixture.timeElapsed || fixture.statusShort === 'PST') && statusTranform(fixture.statusShort, fixture.timeElapsed)}</td>
                                <td className='team-name'>{fixture.awayTeam.name}</td>
                            </tr>

                            <tr>
                                <td>{fixture.oddsWinHome}</td>
                                <td>{fixture.oddsDraw}</td>
                                <td>{fixture.oddsWinAway}</td>
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
                            />
                        )}
                    </ul>

                }
            </div>

        </>

    )
}

export default PreviewPoints
