import {
    useState,
    useEffect
} from 'react'
import {
    useUser
} from '.'
import {
    preferredGeekleague
} from '../classes/localStorage'

export const useGeekLeagueHistory = () => {
    const [geekLeagueHistoryID, setGeekLeagueHistoryID] = useState(null)

    const {
        user,
        isUserConnected
    } = useUser()

    useEffect(() => {
        const leagueID = preferredGeekleague.get()
        if (leagueID) setGeekLeagueHistoryID(leagueID)
        else if (isUserConnected) {
            const geekLeagueID = user.geekLeagues[0]._id
            setGeekLeagueHistoryID(geekLeagueID)
        }
    }, [user, isUserConnected])

    return {
        geekLeagueHistoryID,
        user
    }
}