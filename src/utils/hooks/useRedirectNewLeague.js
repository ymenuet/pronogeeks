import {
    useState,
    useEffect
} from 'react'
import {
    useSelector
} from 'react-redux'
import {
    useHistory
} from 'react-router-dom'
import {
    openNotification
} from '../functions'

export const useRedirectNewLeague = () => {
    const [existingLeagues, setExistingLeagues] = useState(null)

    const history = useHistory()

    const geekLeagues = useSelector(({
        geekleagueReducer
    }) => geekleagueReducer.geekleagues)

    useEffect(() => {
        const leaguesArray = Object.keys(geekLeagues).filter(key => key !== 'empty')

        if (!existingLeagues) setExistingLeagues(leaguesArray)

        else if (leaguesArray.length > existingLeagues.length) {
            const newLeagueID = Object.keys(geekLeagues).filter(id => !existingLeagues.includes(id))[0]
            openNotification('success', `Nouvelle ligue créée !`)
            history.push(`/myGeekLeagues/${newLeagueID}`)
        }

    }, [history, geekLeagues, existingLeagues])

}