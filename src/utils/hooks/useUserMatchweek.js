import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { isConnected, getUserSeasonFromProfile, getUserMatchweekFromProfile } from '../functions'

export const useUserMatchweek = ({ seasonID, matchweekNumber, history }) => {
    const [matchweekPoints, setMatchweekPoints] = useState(null)
    const [matchweekBonus, setMatchweekBonus] = useState(null)
    const [matchweekCorrects, setMatchweekCorrects] = useState(null)
    const [newSeason, setNewSeason] = useState(true)

    const user = useSelector(({ authReducer }) => authReducer.user)

    useEffect(() => {
        if (isConnected(user)) {
            const userSeason = getUserSeasonFromProfile(user, seasonID)

            if (!userSeason || !userSeason.favTeam) {
                history.push(`/pronogeeks/${seasonID}`)

            } else {
                setNewSeason(false)
                const userMatchweek = getUserMatchweekFromProfile(userSeason, matchweekNumber)
                if (userMatchweek) {
                    setMatchweekPoints(userMatchweek.totalPoints)
                    setMatchweekBonus(userMatchweek.bonusPoints)
                    setMatchweekCorrects(userMatchweek.numberCorrects)
                }
            }
        }
    }, [history, seasonID, matchweekNumber, user])

    return { matchweekPoints, matchweekBonus, matchweekCorrects, newSeason }
}