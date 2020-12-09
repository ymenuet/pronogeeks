import React, { useState, useEffect } from 'react'
import { getGeeksProno } from '../helpers'

const GeekProno = ({ user, fixture }) => {
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)

    useEffect(() => {
        getGeeksProno(user, fixture, setHomeScore, setAwayScore)
    }, [fixture, user])

    return (
        <li className="view-pronos-list-item">
            <div>
                <span><img src={user.photo} alt="Pic" /></span>
                <span>{user.username}</span>
            </div>
            <div>
                <span><img src={fixture.homeTeam.logo} alt="Home" />&nbsp;</span>
                <span>{homeScore} - {awayScore}</span>
                <span>&nbsp;<img src={fixture.awayTeam.logo} alt="Away" /></span>
            </div>
        </li>
    )
}

export default GeekProno
