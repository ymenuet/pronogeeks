import React, { useState, useEffect } from 'react'
import { getFixture } from '../services/fixtures'
import { Skeleton } from 'antd'

const Fixture = ({ fixtureID }) => {
    const [fixture, setFixture] = useState(null)

    const fetchFixtures = async (fixtureID) => {
        const fixture = await getFixture(fixtureID)
        setFixture(fixture)
    }

    useEffect(() => {
        fetchFixtures(fixtureID)
    }, [fixtureID])

    return !fixture ? (
        <Skeleton />
    ) : (
            <div>
                <p>{fixture.homeTeam.name} - {fixture.awayTeam.name}</p>
            </div>
        )
}

export default Fixture
