import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Skeleton } from 'antd'
import { printFixtureDate, printFixtureStatus } from '../../utils/helpers'
import { useUserFixtureProno, useMatchStarted, useShowLeaguesPronos } from '../../utils/hooks'
import { SavePronoButton, ViewGeekLeaguePronos, ErrorMessage } from '../'
import { FavTeamIcon } from '../Icons'
import './fixture.css'

import { handleInputHomeProno, handleInputAwayProno } from '../../state/actions/pronogeekActions'

const Fixture = ({ fixture, showLeaguePronos, setShowLeaguePronos, errorProno, savingAll }) => {

    const { pronogeek, homeScore, awayScore, modified } = useUserFixtureProno(fixture)

    const matchStarted = useMatchStarted(fixture)

    const { showLeagues, setShowLeagues, seeLeaguePronos } = useShowLeaguesPronos(showLeaguePronos, setShowLeaguePronos)

    const loadingApi = useSelector(({ apiFootballReducer }) => apiFootballReducer.loading)

    const dispatch = useDispatch()


    return !fixture || homeScore === null || awayScore === null || loadingApi ? (

        <div style={{ padding: 20, paddingTop: 0 }}>
            <Skeleton active />
        </div>

    ) : (

        <div className='fixture-line'>

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
                        <th>
                            <small>{fixture.homeTeam.stadium}<br />{printFixtureDate(fixture.date).fullDate}<br />à {printFixtureDate(fixture.date).fullTime}</small>
                        </th>
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

                    <tr className='score-teams-row'>
                        <td className='team-name'>{fixture.homeTeam.name}</td>
                        <td className='score-fixture'>{fixture.goalsHomeTeam} - {fixture.goalsAwayTeam}</td>
                        <td className='team-name'>{fixture.awayTeam.name}</td>
                    </tr>

                    {(fixture.timeElapsed || fixture.statusShort === 'PST') && <tr className='pb-1'>
                        <td></td>
                        <td className='fixture-status'>{printFixtureStatus(fixture.statusShort, fixture.timeElapsed)}</td>
                        <td></td>
                    </tr>}

                    <tr className='odds-section odds-top'>
                        <td>Cote domicile :</td>
                        <td>Cote nul :</td>
                        <td>Cote extérieur :</td>
                    </tr>

                    <tr className='odds-section odds-bottom'>
                        <td>{fixture.oddsWinHome}</td>
                        <td>{fixture.oddsDraw}</td>
                        <td>{fixture.oddsWinAway}</td>
                    </tr>

                    {errorProno ? <ErrorMessage style={{ marginTop: 20 }}>{errorProno}</ErrorMessage>

                        : <tr className='prono-section'>
                            <td className='prono-input-col'>
                                <label>Buts domicile :</label>
                                <input
                                    className='prono-input'
                                    type="number"
                                    name='homeProno'
                                    value={homeScore}
                                    min={0}
                                    onChange={e => dispatch(handleInputHomeProno(e.target.value, fixture))}
                                    placeholder='Prono'
                                    disabled={matchStarted}
                                />
                            </td>

                            <td className='prono-input-col'>

                                <SavePronoButton
                                    pronogeek={pronogeek}
                                    fixture={fixture}
                                    modified={modified}
                                    matchStarted={matchStarted}
                                    homeScore={homeScore}
                                    awayScore={awayScore}
                                    seeLeaguePronos={seeLeaguePronos}
                                    savingAll={savingAll}
                                />

                            </td>

                            <td className='prono-input-col'>
                                <label>Buts extérieur :</label>
                                <input
                                    className='prono-input'
                                    type="number"
                                    name='awayProno'
                                    value={awayScore}
                                    min={0}
                                    onChange={e => dispatch(handleInputAwayProno(e.target.value, fixture))}
                                    placeholder='Prono'
                                    disabled={matchStarted}
                                />
                            </td>
                        </tr>}

                </tbody>

            </table>

            {pronogeek.points > 0 && pronogeek.bonusFavTeam && (
                <div className='points-cell'>
                    Tu as scoré {pronogeek.points}pts,<br />
                        avec bonus {pronogeek.exact && 'score exact (cote*2)'}{pronogeek.exact && <br />}
                    {pronogeek.exact && 'et'} 30pts équipe de <FavTeamIcon size='24px' />
                </div>
            )}

            {pronogeek.points > 0 && !pronogeek.bonusFavTeam && (
                <div className='points-cell'>
                    Tu as scoré {pronogeek.points}pts{pronogeek.exact && ','}{pronogeek.exact && <br />}
                    {pronogeek.exact && `avec bonus score exact (cote*2)`}
                </div>
            )}

            {pronogeek.points === 0 && pronogeek.addedToProfile && (
                <div className='points-cell'>
                    Dommage, mauvais prono...
                </div>
            )}

            {showLeagues && <ViewGeekLeaguePronos
                fixture={fixture}
                setShowLeagues={setShowLeagues}
            />}


        </div>
    )
}

export default Fixture
