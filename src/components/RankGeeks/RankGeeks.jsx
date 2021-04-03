import React, { useEffect, useState } from 'react'
import { RankingOneGeek } from '..'
import { rankGeeks } from '../../utils/functions'
import { useUser } from '../../utils/hooks'
import { SIZE_GENERAL_RANKING } from '../../utils/constants'

const RankGeeks = ({ players, seasonID, generalRanking, matchweek }) => {

    const [ranking, setRanking] = useState(null)
    const [userRank, setUserRank] = useState(null)

    const { user, isUserConnected } = useUser()

    useEffect(() => {
        if (players) {
            if (!generalRanking) {
                const ranking = rankGeeks(players, seasonID, matchweek)
                setRanking(ranking)
            }

            else setRanking(players.slice(0, SIZE_GENERAL_RANKING))
        }

    }, [players, seasonID, matchweek, setRanking, generalRanking])

    useEffect(() => {
        const setUserRanking = (user, ranking) => {
            let indexUser = ranking.map(player => player._id).indexOf(user._id)
            while (ranking[indexUser].tied) indexUser--
            setUserRank(indexUser + 1)
        }

        if (isUserConnected) {
            if (!generalRanking && ranking) setUserRanking(user, ranking)

            else if (generalRanking) setUserRanking(user, players)

        }

    }, [user, isUserConnected, ranking, players, generalRanking])

    const getRank = (geeks, index) => {
        let i = index
        while (geeks[i].tied) i--
        return i + 1
    }

    return (
        ranking ? <ul className={`list-group list-group-flush ${generalRanking ? 'season-ranking' : 'geekleague-ranking-detail'}`}>

            {userRank > 1 && <RankingOneGeek
                user={user}
                geek={user}
                rank={userRank}
                seasonID={seasonID}
                matchweek={matchweek}
                header
            />}

            {ranking.map((player, index) => <RankingOneGeek
                key={player._id}
                user={user}
                geek={player}
                rank={getRank(ranking, index)}
                seasonID={seasonID}
                matchweek={matchweek}
            />)}

        </ul> : null
    )
}

export default RankGeeks
