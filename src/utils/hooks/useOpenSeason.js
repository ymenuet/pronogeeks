import {
    useState,
    useEffect
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    getUserSeasonFromProfile
} from '../functions'
import {
    useUser
} from '.'

import {
    setNextMatchweek
} from '../../actions/seasonActions'

export const useOpenSeason = season => {
    const [seasonTeams, setSeasonTeams] = useState(null)
    const [newSeason, setNewSeason] = useState(null)
    const [matchweek, setMatchweek] = useState(null)

    const {
        user,
        isUserConnected
    } = useUser()

    const {
        nextMatchweeks,
        loading: loadingSeason
    } = useSelector(({
        seasonReducer
    }) => seasonReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isUserConnected && season) {
            const userSeason = getUserSeasonFromProfile(user, season._id)

            if (!userSeason || !userSeason.favTeam) {
                const seasonTeams = season.rankedTeams.sort((a, b) => {
                    if (a.name > b.name) return 1
                    else return -1
                })
                setSeasonTeams(seasonTeams)
                setNewSeason(true)

            } else if (!nextMatchweeks[season._id] && !loadingSeason) {
                setNewSeason(false)
                dispatch(setNextMatchweek(season))

            } else if (nextMatchweeks[season._id]) {
                setNewSeason(false)
                setMatchweek(nextMatchweeks[season._id])
            }
        }
    }, [user, isUserConnected, season, nextMatchweeks, loadingSeason, dispatch])

    return {
        seasonTeams,
        newSeason,
        matchweek,
        loadingSeason,
        setNewSeason
    }
}