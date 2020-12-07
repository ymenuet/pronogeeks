import React, { useEffect, useState } from 'react'
import { saveGeekLeagueHistory } from '../services/user'
import { fetchLeague } from '../services/geekLeague'
import Loader from './Loader'
import GeekProno from './GeekProno'

const PreviewPoints = ({ user, fixture }) => {

    const [geekLeague, setGeekLeague] = useState(user.geekLeagueHistory)
    const [geekLeagueDetails, setGeekLeagueDetails] = useState(null)

    useEffect(() => {

        const getLeague = async () => {
            const league = await fetchLeague(geekLeague)
            setGeekLeagueDetails(league)
            await saveGeekLeagueHistory(user._id, league._id)
        }
        if (geekLeague) getLeague()

    }, [geekLeague, user])

    return (

        <div>

            <select
                defaultValue={geekLeague}
                onChange={e => setGeekLeague(e.target.value)}
                style={{ color: 'black' }}
            >

                {user.geekLeagues.map(oneGeekLeague =>
                    <option
                        key={oneGeekLeague._id}
                        value={oneGeekLeague._id}
                    >
                        {oneGeekLeague.name}
                    </option>
                )}

            </select>

            {!geekLeagueDetails ? <Loader /> : <div>
                <ul>
                    {geekLeagueDetails.geeks.map((geek, i) =>
                        <GeekProno
                            key={geek._id}
                            user={geek}
                            fixture={fixture}
                        />
                    )}
                </ul>

            </div>}

        </div>

    )
}

export default PreviewPoints
