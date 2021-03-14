import {
    useState,
    useEffect
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    handleStateWithId
} from '../stateHandlers'
import {
    useUser
} from '.'

import {
    getSeasonPlayers
} from '../../actions/geekActions'

export const useSeasonPlayersRanking = (season, rankingSize) => {
    const [intermediateRanking, setIntermediateRanking] = useState(null)
    const [seasonRankingFull, setSeasonRankingFull] = useState(null)
    const [seasonRanking, setSeasonRanking] = useState(null)
    const [userRanking, setUserRanking] = useState(null)
    const [errorRanking, setErrorRanking] = useState(null)

    const {
        user,
        isUserConnected
    } = useUser()

    const seasonGeeksRankings = useSelector(({
        geekReducer
    }) => geekReducer.seasonGeeksRankings)

    const dispatch = useDispatch()

    useEffect(() => {
        if (season && season._id) {
            handleStateWithId({
                id: season._id,
                reducerData: seasonGeeksRankings,
                action: id => dispatch(getSeasonPlayers(id)),
                setResult: setIntermediateRanking,
                setError: setErrorRanking
            })
        }

    }, [season, seasonGeeksRankings, dispatch])


    useEffect(() => {
        if (intermediateRanking && isUserConnected && user.seasons.length) {
            const rankedGeeks = intermediateRanking.map(geek => {
                if (geek._id === user._id) return user
                return geek
            })
            const userRanking = rankedGeeks.map(geek => geek._id).indexOf(user._id)
            const rankedGeeks20 = rankedGeeks.slice(0, rankingSize)
            setUserRanking(userRanking)
            setSeasonRankingFull(rankedGeeks)
            setSeasonRanking(rankedGeeks20)
        }

    }, [user, isUserConnected, rankingSize, intermediateRanking])

    return {
        seasonRankingFull,
        setSeasonRankingFull,
        userRanking,
        seasonRanking,
        errorRanking
    }
}