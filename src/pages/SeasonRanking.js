import React, { useState, useEffect, useContext } from 'react'
import { getSeasonData } from '../services/seasons'
import { Context } from '../context'

const SeasonRanking = ({ match: { params: { seasonID } } }) => {

    const [season, setSeason] = useState(null)
    // const [userProvRanking, setUserProvRanking] = useState(null)
    const { user } = useContext(Context)

    useEffect(() => {
        if (user) {
            const seasonUser = user.seasons.filter(season => season.season._id === seasonID)
            console.log(seasonUser[0].provisionalRanking);
        }
        const fetchSeasonData = async () => {
            const season = await getSeasonData(seasonID)
            setSeason(season)
        }
        fetchSeasonData()
    }, [seasonID, user])

    return season ? <ul>
        {season.rankedTeams.map(team => <li key={team._id}>{team.name}</li>)}
    </ul> : null
}

export default SeasonRanking
