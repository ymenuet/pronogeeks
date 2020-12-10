import React, { useState, useEffect } from 'react'
import { getGeeksProno } from '../helpers'

const GeekProno = ({ user, fixture, winner, determineWinner }) => {
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)
    const [correct, setCorrect] = useState(false)
    const [exact, setExact] = useState(false)

    useEffect(() => {
        getGeeksProno(user, fixture, setHomeScore, setAwayScore)
    }, [fixture, user])

    useEffect(() => {
        if ((homeScore || homeScore === 0) &&
            (awayScore || awayScore === 0)) {
            const prono = determineWinner(homeScore, awayScore)
            if (winner === prono) setCorrect(true)
            const exact = fixture.goalsHomeTeam === homeScore && fixture.goalsAwayTeam === awayScore
            if (exact) setExact(true)
        }
    }, [fixture, homeScore, awayScore, winner, determineWinner])

    return (
        <li className={`view-pronos-list-item ${correct ? 'right-prono' : 'wrong-prono'} ${exact ? 'exact-prono' : ''}`}>
            <div>
                <span><img src={user.photo} alt="Pic" /></span>
                <span>{user.username}</span>
            </div>
            <div>
                <span><img src={fixture.homeTeam.logo} alt="Home" /></span>
                <span>&nbsp;{homeScore} - {awayScore}&nbsp;</span>
                <span><img src={fixture.awayTeam.logo} alt="Away" /></span>
            </div>
        </li>
    )
}

export default GeekProno
