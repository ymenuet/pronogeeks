import React, { useState, useEffect } from 'react'
import { getGeeksProno } from '../helpers'

const GeekProno = ({ user, fixture }) => {
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)

    useEffect(() => {
        getGeeksProno(user, fixture, setHomeScore, setAwayScore)
    }, [])

    return (
        <li>
            <span>{user.username}</span>
            <span>{homeScore} - {awayScore}</span>
        </li>
    )
}

export default GeekProno
