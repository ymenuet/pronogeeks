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
    getLeague
} from '../../actions/geekleagueActions'

export const useGeekLeague = geekLeagueID => {
    const [geekLeague, setGeekLeague] = useState(null)
    const [errorGeekLeague, setErrorGeekLeague] = useState(false)

    const geekLeagues = useSelector(({
        geekleagueReducer
    }) => geekleagueReducer.geekleagues)

    const dispatch = useDispatch()

    useEffect(() => {
        if (geekLeagueID) handleStateWithId({
            id: geekLeagueID,
            reducerData: geekLeagues,
            action: (id) => dispatch(getLeague(id)),
            setResult: setGeekLeague,
            setError: setErrorGeekLeague
        })
    }, [geekLeagueID, geekLeagues, dispatch])

    return {
        geekLeague,
        errorGeekLeague
    }
}