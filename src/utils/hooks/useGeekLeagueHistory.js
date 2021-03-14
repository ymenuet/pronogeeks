import {
    useState,
    useEffect
} from 'react'
import {
    useUser
} from '.'

export const useGeekLeagueHistory = () => {
    const [geekLeagueID, setGeekLeagueID] = useState(null)

    const {
        user,
        isUserConnected
    } = useUser()

    useEffect(() => {
        if (isUserConnected) {
            const geekLeagueID = user.geekLeagueHistory || user.geekLeagues[0]._id
            setGeekLeagueID(geekLeagueID)
        }
    }, [user, user.geekLeagueHistory, isUserConnected])

    return geekLeagueID
}