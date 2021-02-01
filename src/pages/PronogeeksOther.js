import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ErrorMessage, FixtureOther, Loader, MatchweekNavigation } from '../components'
import '../styles/pronogeeks.css'

import * as geekActions from '../actions/geekActions'
import * as seasonActions from '../actions/seasonActions'
import * as pronogeekActions from '../actions/pronogeekActions'

const Pronogeeks = ({ match: { params: { matchweekNumber, seasonID, geekID } }, history, loading, loadingGeek, loadingSeason, loadingPronogeek, detailedGeeks, detailedSeasons, seasonMatchweeks, geeksPronogeeks, errorGeek, errorSeason, errorPronogeek, getDetailsGeek, getSeason, getMatchweekFixtures, getGeekMatchweekPronos }) => {
    const [season, setSeason] = useState(null)
    const [fixtures, setFixtures] = useState(null)
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)
    const [geek, setGeek] = useState(null)
    const [matchweekStarted, setMatchweekStarted] = useState(true)
    const [noPronogeeks, setNoPronogeeks] = useState(false)

    useEffect(() => {
        if (
            !detailedGeeks[geekID] &&
            !loadingGeek &&
            !errorGeek
        ) getDetailsGeek(geekID)

        else if (detailedGeeks[geekID]) setGeek(detailedGeeks[geekID])

    }, [detailedGeeks, geekID, getDetailsGeek, loadingGeek, errorGeek])


    useEffect(() => {
        const seasonDetails = detailedSeasons[seasonID]
        if (
            !seasonDetails &&
            !loadingSeason &&
            !errorSeason
        ) getSeason(seasonID)

        else if (seasonDetails) setSeason(seasonDetails)

    }, [seasonID, matchweekNumber, detailedSeasons, loadingSeason, getSeason, errorSeason])


    useEffect(() => {
        const matchweekDetails = seasonMatchweeks[`${seasonID}-${matchweekNumber}`]
        if (
            season &&
            !matchweekDetails &&
            !loadingSeason &&
            !errorSeason
        ) getMatchweekFixtures(season, matchweekNumber)

        else if (matchweekDetails) {
            setFixtures(matchweekDetails.fixtures)
            setMatchweekStarted(matchweekDetails.hasStarted)
        }

    }, [seasonID, matchweekNumber, season, seasonMatchweeks, loadingSeason, getMatchweekFixtures, errorSeason])


    useEffect(() => {
        if (
            !geeksPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`] &&
            !loadingPronogeek &&
            !errorPronogeek
        ) getGeekMatchweekPronos(geekID, seasonID, matchweekNumber)

    }, [geekID, seasonID, matchweekNumber, loadingPronogeek, geeksPronogeeks, getGeekMatchweekPronos, errorPronogeek])


    useEffect(() => {
        const setPoints = geek => {
            if (geek.seasons.length < 1 ||
                geek.seasons.filter(seas => seas.season.toString() === seasonID.toString()).length < 1 ||
                geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.length < 1 ||
                geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString()).length < 1) {
                return setNoPronogeeks(true)
            } else {
                setNoPronogeeks(false)
                const seasonUser = geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0]
                const matchweekUser = seasonUser.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())[0]
                setMatchweekPoints(matchweekUser.totalPoints)
                setMatchweekBonus(matchweekUser.bonusPoints)
                setMatchweekCorrects(matchweekUser.numberCorrects)
            }
        }
        if (geek) setPoints(geek)

    }, [matchweekNumber, seasonID, geek])


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

    return loading || !season || !fixtures || !geek ? (

        <div className='pronogeeks-bg'>
            {errorSeason || errorGeek || errorPronogeek ? <ErrorMessage>{errorSeason || errorGeek || errorPronogeek}</ErrorMessage> : <Loader color='rgb(4, 78, 199)' />}
        </div>

    ) : <div className='pronogeeks-bg matchweek-page'>

            <h2>
                {season.leagueName} saison {season.year} :<br />
                    Pronos de {geek.username} J{matchweekNumber}
            </h2>

            {!matchweekStarted || noPronogeeks ? <>

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
                                fixture={fixture}
                                geek={geek}
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
    detailedSeasons: state.seasonReducer.detailedSeasons,
    seasonMatchweeks: state.seasonReducer.seasonMatchweeks,
    loadingSeason: state.seasonReducer.loading,
    errorSeason: state.seasonReducer.error,
    detailedGeeks: state.geekReducer.detailedGeeks,
    loadingGeek: state.geekReducer.loading,
    errorGeek: state.geekReducer.error,
    geeksPronogeeks: state.pronogeekReducer.geeksPronogeeks,
    loadingPronogeek: state.pronogeekReducer.loading,
    errorPronogeek: state.pronogeekReducer.error,
})

const mapDispatchToProps = {
    ...geekActions,
    ...seasonActions,
    ...pronogeekActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Pronogeeks)