import {
    useState,
    useEffect
} from 'react'
import {
    useUser
} from '.'

export const useGeekLeagueHistory = () => {
    const [geekLeagueHistoryID, setGeekLeagueHistoryID] = useState(null)

    const {
        user,
        isUserConnected
    } = useUser()

    useEffect(() => {
        if (isUserConnected) {
            const geekLeagueID = user.geekLeagueHistory || user.geekLeagues[0]._id
            setGeekLeagueHistoryID(geekLeagueID)
        }
    }, [user, user.geekLeagueHistory, isUserConnected])

    return {
        geekLeagueHistoryID,
        user
    }
}