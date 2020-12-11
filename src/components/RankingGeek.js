import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const RankingGeek = ({ user, geek, index, seasonID, matchweek }) => {

    const [totalPoints, setTotalPoints] = useState(0)
    const [correctPronos, setCorrectPronos] = useState(0)
    const [exactPronos, setExactPronos] = useState(0)
    const [favTeam, setFavTeam] = useState(false)

    useEffect(() => {
        if (
            geek.seasons.length > 0 &&
            geek.seasons.filter(seas => seas.season.toString() === seasonID.toString()).length > 0 &&
            geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.length > 0 &&
            geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.filter(oneMatchweek => oneMatchweek.number.toString() === matchweek.toString()).length > 0
        ) {
            const matchweekDetails = geek.seasons.filter(seas => seas.season.toString() === seasonID.toString())[0].matchweeks.filter(oneMatchweek => oneMatchweek.number.toString() === matchweek.toString())[0]
            setTotalPoints(matchweekDetails.totalPoints)
            setCorrectPronos(matchweekDetails.numberCorrects)
            setExactPronos(matchweekDetails.numberExacts)
            setFavTeam(matchweekDetails.bonusFavTeam)
        }
    }, [geek, matchweek, seasonID])

    return (
        <li
            key={geek._id}
            className='list-group-item d-flex justify-content-between align-items-center'
        >

            {user._id === geek._id && <span><b>{index + 1} : {geek.username}</b></span>}

            {user._id !== geek._id && <span>{index + 1} : {geek.username}&nbsp;
                <Link to={`/geek/${geek._id}/pronogeeks/${seasonID}/matchweek/${matchweek}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(156, 0, 99, 0.8)" width="24px" height="24px">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                </Link>
            </span>}

            {favTeam && <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=" rgb(253, 0, 7)" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>}
            <span style={{ display: 'none' }} className='badge badge-success badge-pill my-badge'>{correctPronos}</span>
            <span style={{ display: 'none' }} className='badge badge-success badge-pill my-badge'>{exactPronos}</span>
            <span className='badge badge-success badge-pill my-badge'>{totalPoints} pts</span>

        </li>
    )
}

export default RankingGeek
