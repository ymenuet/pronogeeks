import React, { useEffect, useState } from 'react'
import { RankingGeek } from '.'
import { rankGeeks } from '../helpers'

const RankGeeks = ({ user, players, seasonID, generalRanking, matchweek }) => {

    const [ranking, setRanking] = useState(null)
    const [userRanking, setUserRanking] = useState(null)

    useEffect(() => {
        if (!generalRanking) {
            const ranking = rankGeeks(players, seasonID, matchweek)
            setRanking(ranking)
        }
        else setRanking(players.slice(0, 50))
    }, [players, seasonID, matchweek, setRanking, generalRanking])

    useEffect(() => {
        const setUserRank = ranking => {
            const userRanking = ranking.map(player => player._id).indexOf(user._id) + 1
            setUserRanking(userRanking)
        }
        if (!generalRanking && ranking) {
            setUserRank(ranking)
        } else if (generalRanking) {
            setUserRank(players)
        }
    }, [user, ranking, players, generalRanking, matchweek])

    return (
        ranking ? <ul className={`list-group list-group-flush ${generalRanking ? 'season-ranking' : 'geekleague-ranking-detail'}`}>

            {userRanking > 1 && <RankingGeek
                user={user}
                geek={user}
                rank={userRanking}
                seasonID={seasonID}
                matchweek={matchweek}
                header
            />}

            {ranking.map((player, index) => <RankingGeek
                key={player._id}
                user={user}
                geek={player}
                rank={index + 1}
                seasonID={seasonID}
                matchweek={matchweek}
            />)}

        </ul> : null
    )
}

export default RankGeeks
