import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getMatchweekFixtures, getSeasonData } from '../services/seasons'
import { ErrorMessage, FixtureOther, Loader, MatchweekNavigation } from '../components'
import '../styles/pronogeeks.css'

import * as geekActions from '../actions/geekActions'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID, geekID } }, history, loading, detailedGeeks, geekLoading, geekError, getDetailsGeek }) => {
    const [season, setSeason] = useState(null)
    const [fixtures, setFixtures] = useState(null)
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)
    const [geek, setGeek] = useState(null)
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
        if (!detailedGeeks[geekID]) getDetailsGeek(geekID)
    }, [detailedGeeks, geekID, getDetailsGeek])

    useEffect(() => {
        if (detailedGeeks[geekID]) setGeek(detailedGeeks[geekID])
    }, [detailedGeeks, geekID])

    useEffect(() => {
        const setPoints = geek => {
            if (geek.seasons.length < 1 ||
                geek.seasons.filter(seas => seas.season._id.toString() === seasonID.toString()).length < 1 ||
                geek.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0].matchweeks.length < 1 ||
                geek.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0].matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString()).length < 1) {
                return setNoPronogeeks(true)
            } else {
                setNoPronogeeks(false)
                const seasonUser = geek.seasons.filter(seas => seas.season._id.toString() === seasonID.toString())[0]
                const matchweekUser = seasonUser.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())[0]
                setMatchweekPoints(matchweekUser.totalPoints)
                setMatchweekBonus(matchweekUser.bonusPoints)
                setMatchweekCorrects(matchweekUser.numberCorrects)
            }
        }
        if (geek) setPoints(geek)

    }, [matchweekNumber, seasonID, geek])

    useEffect(() => {
        const fetchSeason = async seasonID => {
            const season = await getSeasonData(seasonID)
            setSeason(season)
        }
        fetchSeason(seasonID)
        fetchFixtures(seasonID, matchweekNumber)
    }, [matchweekNumber, seasonID])

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

    return !fixtures || !season || loading || geekLoading ? (

        <div className='pronogeeks-bg'>
            <Loader color='rgb(4, 78, 199)' />
        </div>

    ) : <div className='pronogeeks-bg matchweek-page'>

            {geekError ? <ErrorMessage>{geekError}</ErrorMessage> : !matchweekStarted || noPronogeeks ? <>

                <h2>
                    {season.leagueName} saison {season.year} :<br />
                    Pronos de {geek.username} J{matchweekNumber}
                </h2>

                <ul className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">

                    <MatchweekNavigation
                        matchweekNumber={matchweekNumber}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        noPronos={true}
                    />

                </ul>

                <h4 className='not-accessible'>Les pronos de {geek.username} ne sont pas accessibles.</h4>

            </> : <ul className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">

                    <MatchweekNavigation
                        matchweekNumber={matchweekNumber}
                        matchweekPoints={matchweekPoints}
                        matchweekCorrects={matchweekCorrects}
                        matchweekBonus={matchweekBonus}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        myClassName='score-top'
                    />

                    <div className='list-fixtures-header'>
                        <div className='header-title'>Domicile</div>
                        <div>|</div>
                        <div className='header-title'>Extérieur</div>
                    </div>

                    {fixtures.map(fixture => (
                        <li
                            className="list-group-item"
                            key={fixture._id}
                            style={{ background: 'none' }}
                        >
                            <FixtureOther
                                fixtureID={fixture._id}
                                user={geek}
                            />
                        </li>
                    ))}

                    <MatchweekNavigation
                        matchweekNumber={matchweekNumber}
                        matchweekPoints={matchweekPoints}
                        matchweekCorrects={matchweekCorrects}
                        matchweekBonus={matchweekBonus}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        myClassName='score-bottom'
                    />

                </ul>}
        </div>
}

const mapStateToProps = state => ({
    detailedGeeks: state.geekReducer.detailedGeeks,
    geekLoading: state.geekReducer.loading,
    geekError: state.geekReducer.error
})

const mapDispatchToProps = {
    ...geekActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Pronogeeks)