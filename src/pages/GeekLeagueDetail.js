import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context'
import { getSeasonData } from '../services/seasons'
import { fetchLeague, fetchMatchweekRanking } from '../services/geekLeague'
import { Loader, RankingGeek } from '../components'

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

                        <div className='ranking-geekleague-matchweek-container col-10 offset-1 col-lg-6 offset-lg-3'>

                            <h2>Classement {geekLeague.name}</h2>

                            <div className='ranking-geekleague-matchweek'>

                                <div>
                                    <div className='previous-next-btns geekleague-btns'>

                                        {matchweek > 1 && <div>
                                            <button
                                                className='btn my-btn'
                                                onClick={previousMatchweek}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                                </svg>
                                            </button>
                                        </div>}

                                        <h4>J{matchweek} de {season.leagueName}, saison {season.year}</h4>

                                        {matchweek < lastMatchweek && <div>
                                            <button
                                                className='btn my-btn'
                                                onClick={nextMatchweek}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                                </svg>
                                            </button>
                                        </div>}

                                    </div>
                                </div>

                                <ul className='list-group list-group-flush geekleague-ranking-detail'>

                                    {ranking.map((geek, index) => <RankingGeek
                                        key={geek._id}
                                        user={user}
                                        geek={geek}
                                        index={index}
                                        seasonID={seasonID}
                                        matchweek={matchweek}
                                    />)}

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>
            )}
    </div>
}

export default GeekLeagueDetail
