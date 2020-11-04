import React, { useState, useEffect } from 'react'
import { getMatchweekFixtures, getSeasonData } from '../services/seasons'
import { getUser } from '../services/user'
import { FixtureOther, Loader } from '../components'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID, geekID } }, history, loading }) => {
    const [season, setSeason] = useState(null)
    const [fixtures, setFixtures] = useState(null)
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)
    const [user, setUser] = useState(null)
    const [matchweekStarted, setMatchweekStarted] = useState(true)
    const [noPronogeeks, setNoPronogeeks] = useState(false)

    const fetchFixtures = async (season, matchweek) => {
        const fixtures = await getMatchweekFixtures(season, matchweek)
        fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        setFixtures(null)
        if (new Date(fixtures[0].date).getTime() > Date.now()) setMatchweekStarted(false)
        setFixtures(fixtures)
        return true
    }

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(geekID)
            setUser(user)
        }
        fetchUser()
    }, [geekID])

    useEffect(() => {
        const setPoints = user => {
            if (user.seasons.length < 1 ||
                user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString()).length < 1 ||
                user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0].matchweeks.length < 1 ||
                user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0].matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString()).length < 1) {
                return setNoPronogeeks(true)
            } else {
                setNoPronogeeks(false)
                const seasonUser = user.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0]
                const matchweekUser = seasonUser.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())[0]
                setMatchweekPoints(matchweekUser.totalPoints)
                setMatchweekBonus(matchweekUser.bonusPoints)
                setMatchweekCorrects(matchweekUser.numberCorrects)
            }
        }
        if (user) {
            setPoints(user)
        }
        const fetchSeason = async seasonID => {
            const season = await getSeasonData(seasonID)
            setSeason(season)
        }
        fetchSeason(seasonID)

        fetchFixtures(seasonID, matchweekNumber)

    }, [matchweekNumber, seasonID, user])

    const previousPage = () => {
        setFixtures(null)
        setMatchweekStarted(true)
        history.push(`/geek/${geekID}/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) - 1}`)
    }

    const nextPage = () => {
        setFixtures(null)
        setMatchweekStarted(true)
        history.push(`/geek/${geekID}/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) + 1}`)
    }

    return !fixtures || !season || loading || !user ? (

        <div className='pronogeeks-bg'>
            <Loader color='rgb(4, 78, 199)' />
        </div>

    ) : !matchweekStarted || noPronogeeks ? (

        <div className='pronogeeks-bg matchweek-page'>

            <h2>
                {season.leagueName} saison {season.year} :<br />
                    Pronos de {user.username} J{matchweekNumber}
            </h2>

            <ul className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">

                <div className='previous-next-btns'>

                    {parseInt(matchweekNumber) !== 1 && <div>
                        <button className='btn my-btn' onClick={previousPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg></button>
                    </div>}

                    <div className='score-top'>
                        <p>Total J{matchweekNumber} : ? pts (?/10)</p>
                    </div>

                    {parseInt(matchweekNumber) !== 38 && <div>
                        <button className='btn my-btn' onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></button>
                    </div>}

                </div>

            </ul>

            <h4 className='not-accessible'>Les pronos de {user.username} ne sont pas accessibles.</h4>

        </div>

    ) : (

                <div className='pronogeeks-bg matchweek-page'>

                    <h2>
                        {season.leagueName} saison {season.year} :<br />
                    Pronos de {user.username} J{matchweekNumber}
                    </h2>

                    <ul className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">

                        <div className='previous-next-btns'>

                            {parseInt(matchweekNumber) !== 1 && <div>
                                <button className='btn my-btn' onClick={previousPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg></button>
                            </div>}

                            {matchweekBonus > 0 && <div className='score-top'>
                                <p>Total J{matchweekNumber} : {matchweekPoints} pts<br />dont {matchweekBonus} pts bonus ({matchweekCorrects}/10)</p>
                            </div>}
                            {!matchweekBonus && <div className='score-top'>
                                <p>Total J{matchweekNumber} : {matchweekPoints} pts ({matchweekCorrects}/10)</p>
                            </div>}

                            {parseInt(matchweekNumber) !== 38 && <div>
                                <button className='btn my-btn' onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></button>
                            </div>}

                        </div>

                        <div className='list-fixtures-header'>
                            <div className='header-title'>Domicile</div>
                            <div>|</div>
                            <div className='header-title'>Extérieur</div>
                        </div>

                        {fixtures.map(fixture => (
                            <li className="list-group-item" key={fixture._id} style={{ background: 'none' }}>
                                <FixtureOther fixtureID={fixture._id} user={user} />
                            </li>
                        ))}

                        <div className='previous-next-btns'>

                            {parseInt(matchweekNumber) !== 1 && <div>
                                <button className='btn my-btn' onClick={previousPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg></button>
                            </div>}

                            {matchweekBonus > 0 && <div className='score-bottom'>
                                <p>Total J{matchweekNumber} : {matchweekPoints} pts<br />dont {matchweekBonus} pts bonus ({matchweekCorrects}/10)</p>
                            </div>}
                            {!matchweekBonus && <div className='score-bottom'>
                                <p>Total J{matchweekNumber} : {matchweekPoints} pts ({matchweekCorrects}/10)</p>
                            </div>}

                            {parseInt(matchweekNumber) !== 38 && <div>
                                <button className='btn my-btn' onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></button>
                            </div>}

                        </div>

                    </ul>

                </div>

            )
}

export default Pronogeeks