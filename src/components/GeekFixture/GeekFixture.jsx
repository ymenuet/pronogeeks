import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Skeleton } from 'antd'
import { dateTransform, statusTranform } from '../../utils/functions'
import { FavTeamIcon } from '../Icons'
import { ErrorMessage } from '../'
import './fixture.css'

const GeekFixture = ({ fixture, geek, geeksMatchweekPronogeeks }) => {
    const [pronogeek, setPronogeek] = useState(null)
    const [matchStarted, setMatchStarted] = useState(false)
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)
    const [errorProno, setErrorProno] = useState(null)

    useEffect(() => {
        if (
            new Date(fixture.date) < Date.now() &&
            fixture.statusShort !== 'PST'
        ) setMatchStarted(true)

    }, [fixture])


    useEffect(() => {
        let pronogeek = { homeProno: '', awayProno: '' }
        const { _id, season, matchweek } = fixture

        const geekPronogeeks = geeksMatchweekPronogeeks[`${geek._id}-${season}-${matchweek}`]
        if (geekPronogeeks) {

            if (geekPronogeeks.error) setErrorProno(geekPronogeeks.error)

            if (geekPronogeeks[_id]) pronogeek = geekPronogeeks[_id]
        }

        setPronogeek(pronogeek)
        setHomeScore(pronogeek.homeProno)
        setAwayScore(pronogeek.awayProno)

    }, [fixture, geek, geeksMatchweekPronogeeks])


    return !fixture || homeScore == null || awayScore == null ? (

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
                                <small>{fixture.homeTeam.stadium}<br />{dateTransform(fixture.date).fullDate}<br />à {dateTransform(fixture.date).fullTime}</small>
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
                            <td className='fixture-status'>{statusTranform(fixture.statusShort, fixture.timeElapsed)}</td>
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

                        {matchStarted && fixture.statusShort !== 'PST' && <tr className='prono-section'>

                            {errorProno ? <ErrorMessage style={{ margin: '0 auto' }}>{errorProno}</ErrorMessage>

                                : <>
                                    <td className='prono-input-col'>
                                        <label>Buts domicile :</label>
                                        <input
                                            className='prono-input'
                                            type="number"
                                            name='homeProno'
                                            value={homeScore}
                                            placeholder='Prono'
                                            disabled={true}
                                        />
                                    </td>

                                    <td className='prono-input-col'>
                                        {pronogeek.points > 0 && pronogeek.bonusFavTeam && (
                                            <div style={{ margin: '0 10px' }}>
                                                {geek.username} a scoré {pronogeek.points}pts<br />
                                        (bonus {pronogeek.exact && 'score exact'}{pronogeek.exact && <br />}
                                                {pronogeek.exact && 'et '}<FavTeamIcon size='20px' />)
                                            </div>
                                        )}

                                        {pronogeek.points > 0 && !pronogeek.bonusFavTeam && (
                                            <div style={{ margin: '0 10px' }}>
                                                {geek.username} a scoré {pronogeek.points}pts<br />
                                                {pronogeek.exact && '(bonus score exact)'}
                                            </div>
                                        )}

                                        {pronogeek.points === 0 && pronogeek.addedToProfile && (
                                            <div style={{ margin: '0 10px' }}>
                                                Mauvais prono...
                                            </div>
                                        )}
                                    </td>

                                    <td className='prono-input-col'>
                                        <label>Buts extérieur :</label>
                                        <input
                                            className='prono-input'
                                            type="number"
                                            name='awayProno'
                                            value={awayScore}
                                            placeholder='Prono'
                                            disabled={true}
                                        />
                                    </td>
                                </>}

                        </tr>}

                        {(!matchStarted || fixture.statusShort === 'PST') && <tr style={{ marginTop: 10 }}>
                            <td></td>
                            <td>Pronogeek non visible.</td>
                            <td></td>
                        </tr>}

                    </tbody>

                </table>

            </div>
        )
}

const mapStateToProps = state => ({
    geeksMatchweekPronogeeks: state.pronogeekReducer.geeksMatchweekPronogeeks,
})

export default connect(mapStateToProps)(GeekFixture)
