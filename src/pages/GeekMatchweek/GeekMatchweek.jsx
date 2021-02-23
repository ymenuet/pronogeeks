import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ErrorMessage, GeekFixture, Loader, MatchweekNavigation } from '../../components'
import { handleStateWithId, handleStateMatchweekFixtures } from '../../stateHandlers'
import './pronogeeks.css'

import * as geekActions from '../../actions/geekActions'
import * as seasonActions from '../../actions/seasonActions'
import * as pronogeekActions from '../../actions/pronogeekActions'

const GeekMatchweek = ({ match: { params: { matchweekNumber, seasonID, geekID } }, history, loading, loadingSeason, detailedGeeks, detailedSeasons, seasonMatchweeks, geeksMatchweekPronogeeks, getDetailsGeek, getSeason, getMatchweekFixtures, getGeekMatchweekPronos }) => {
    const [season, setSeason] = useState(null)
    const [fixtures, setFixtures] = useState(null)
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)
    const [geek, setGeek] = useState(null)
    const [matchweekStarted, setMatchweekStarted] = useState(true)
    const [noPronogeeks, setNoPronogeeks] = useState(false)
    const [errorGeek, setErrorGeek] = useState(false)
    const [errorSeason, setErrorSeason] = useState(false)

    useEffect(() => {
        handleStateWithId({
            id: geekID,
            reducerData: detailedGeeks,
            action: getDetailsGeek,
            setResult: setGeek,
            setError: setErrorGeek
        })
    }, [geekID, detailedGeeks, getDetailsGeek])


    useEffect(() => {
        handleStateWithId({
            id: seasonID,
            reducerData: detailedSeasons,
            action: getSeason,
            setResult: setSeason,
            setError: setErrorSeason
        })
    }, [seasonID, detailedSeasons, getSeason])


    useEffect(() => {
        handleStateMatchweekFixtures({
            season,
            matchweekNumber,
            seasonMatchweeks,
            loadingSeason,
            getMatchweekFixtures,
            setFixtures,
            setMatchweekStarted
        })

    }, [matchweekNumber, season, seasonMatchweeks, loadingSeason, getMatchweekFixtures])


    useEffect(() => {
        if (!geeksMatchweekPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`]) getGeekMatchweekPronos(geekID, seasonID, matchweekNumber)

    }, [geekID, seasonID, matchweekNumber, geeksMatchweekPronogeeks, getGeekMatchweekPronos])


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
            {errorSeason || errorGeek ? <ErrorMessage>{errorSeason || errorGeek}</ErrorMessage> : <Loader color='rgb(4, 78, 199)' />}
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
                        gamesFinished={seasonMatchweeks[`${seasonID}-${matchweekNumber}`].gamesFinished}
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
                            <GeekFixture
                                fixture={fixture}
                                geek={geek}
                            />
                        </li>
                    ))}

                    <MatchweekNavigation
                        matchweekNumber={matchweekNumber}
                        matchweekPoints={matchweekPoints}
                        matchweekCorrects={matchweekCorrects}
                        gamesFinished={seasonMatchweeks[`${seasonID}-${matchweekNumber}`].gamesFinished}
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
    detailedGeeks: state.geekReducer.detailedGeeks,
    geeksMatchweekPronogeeks: state.pronogeekReducer.geeksMatchweekPronogeeks,
})

const mapDispatchToProps = {
    ...geekActions,
    ...seasonActions,
    ...pronogeekActions
}

export default connect(mapStateToProps, mapDispatchToProps)(GeekMatchweek)