import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context'
import { getSeasonData } from '../services/seasons'
import { fetchLeague, fetchMatchweekRanking } from '../services/geekLeague'
import { Loader } from '../components'
import { Link } from 'react-router-dom'

const GeekLeagueDetail = ({ match: { params: { geekLeagueID, seasonID } }, loading }) => {
    const { user } = useContext(Context)
    const [season, setSeason] = useState(null)
    const [matchweek, setMatchweek] = useState(null)
    const [lastMatchweek, setLastMatchweek] = useState(null)
    const [geekLeague, setGeekLeague] = useState(null)
    const [ranking, setRanking] = useState(null)

    useEffect(() => {
        const setNextMatchweek = async (seasonID) => {
            const season = await getSeasonData(seasonID)
            setSeason(season)
            const lastFixtures = season.fixtures.filter(fixture => new Date(fixture.date).getTime() < Date.now())
            if (lastFixtures.length > 0) {
                const lastMatchweek = lastFixtures[lastFixtures.length - 1].matchweek
                setMatchweek(lastMatchweek)
                setLastMatchweek(lastMatchweek)
            } else {
                setMatchweek(1)
                setLastMatchweek(1)
            }
        }
        setNextMatchweek(seasonID)

        const getGeekLeague = async (geekLeagueID) => {
            const geekLeague = await fetchLeague(geekLeagueID)
            setGeekLeague(geekLeague)
        }
        getGeekLeague(geekLeagueID)
    }, [geekLeagueID, seasonID])

    useEffect(() => {
        if (matchweek) {
            const updateRanking = async () => {
                const geeks = await fetchMatchweekRanking(geekLeagueID, seasonID, matchweek)
                setRanking(geeks)
            }
            updateRanking()
        }
    }, [matchweek, geekLeagueID, seasonID])

    const setRank = (num) => {
        if (parseInt(num) === 1) return '1er(e)'
        else return `${num}ème`
    }

    const previousMatchweek = () => {
        setRanking(null)
        setMatchweek(matchweek - 1)
    }

    const nextMatchweek = () => {
        setRanking(null)
        setMatchweek(matchweek + 1)
    }

    return <div className='geekleague-bg geekleague-details'>
        {loading || !geekLeague || !matchweek || !season || !ranking || !lastMatchweek ? (
            <Loader />
        ) : (
                <div className='container'>
                    <div className='row'>
                        <div className='col-10 offset-1 col-lg-6 offset-lg-3'>
                            <h2>Classement {geekLeague.name}</h2>
                            <div className='ranking-geekleague-matchweek'>
                                <div>
                                    <div className='previous-next-btns geekleague-btns'>
                                        {matchweek > 1 && <div><button className='btn my-btn' onClick={previousMatchweek}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg></button></div>}
                                        <h4>J{matchweek} de {season.leagueName}, saison {season.year}</h4>
                                        {matchweek < lastMatchweek && <div><button className='btn my-btn' onClick={nextMatchweek}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></button></div>}
                                    </div>
                                </div>
                                <ul className='list-group list-group-flush geekleague-ranking-detail mt-2'>
                                    {ranking.map((geek, index) => <li key={geek._id} className='list-group-item d-flex justify-content-between align-items-center'>
                                        {user._id === geek._id && <span><b>{setRank(index + 1)} : {geek.username}</b></span>}
                                        {user._id !== geek._id && <span>{setRank(index + 1)} : {geek.username} <Link to={`/geek/${geek._id}/pronogeeks/${seasonID}/matchweek/${matchweek}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(156, 0, 99, 0.8)" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg></Link></span>}
                                        {geek.seasons.length > 0 && geek.seasons.filter(seas => seas.season.toString() === seasonID.toString()).length > 0 && geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.length > 0 && geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.filter(oneMatchweek => oneMatchweek.number.toString() === matchweek.toString()).length > 0 && <span className='badge badge-success badge-pill my-badge'>
                                            {geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.filter(oneMatchweek => oneMatchweek.number.toString() === matchweek.toString())[0].totalPoints} pts
                                        </span>}
                                        {(geek.seasons.length < 1 || geek.seasons.filter(seas => seas.season.toString() === seasonID.toString()).length < 1 || geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.length < 1 || geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.filter(oneMatchweek => oneMatchweek.number.toString() === matchweek.toString()).length < 1) && <span className='badge badge-success badge-pill my-badge'>
                                            0 pts
                                        </span>}
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </div >
}

export default GeekLeagueDetail
