import React, { useEffect, useState } from 'react'
import { RankingGeek } from '.'

const RankGeeks = ({ user, userRanking, ranking, seasonID, geekLeague, matchweek }) => {

    const [userRankingLocal, setUserRankingLocal] = useState(userRanking)

    useEffect(() => {
        if (!userRanking) {
            const userRanking = ranking.map(player => player.username).indexOf(user.username)
            setUserRankingLocal(userRanking)
        }
    }, [user, ranking, userRanking])

    return (
        userRankingLocal || userRankingLocal === 0 ? <ul className={`list-group list-group-flush ${geekLeague ? 'geekleague-ranking-detail' : 'season-ranking'}`}>

            {userRankingLocal !== 0 && <RankingGeek
                user={user}
                geek={user}
                index={userRankingLocal}
                seasonID={seasonID}
                matchweek={matchweek}
                header
            />}

            {ranking.map((player, index) => <RankingGeek
                key={player._id}
                user={user}
                geek={player}
                index={index}
                seasonID={seasonID}
                matchweek={matchweek}
            />)}

        </ul> : null
    )
}

export default RankGeeks
