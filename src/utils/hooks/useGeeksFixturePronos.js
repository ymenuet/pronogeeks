import {
    useState,
    useEffect
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    handleStateWith2Ids
} from '../helpers/stateHandlers'

import {
    getGeekleagueFixturePronos
} from '../../state/actions/pronogeekActions'

export const useGeeksFixturePronos = (fixture, geekLeague) => {
    const [geeksPronos, setGeeksPronos] = useState(null)
    const [errorPronos, setErrorPronos] = useState(false)

    const geeksFixturePronogeeks = useSelector(({
        pronogeekReducer
    }) => pronogeekReducer.geeksFixturePronogeeks)

    const dispatch = useDispatch()

    useEffect(() => {
        if (geekLeague && fixture) {
            handleStateWith2Ids({
                id1: fixture._id,
                id2: geekLeague._id,
                reducerData: geeksFixturePronogeeks,
                action: (id1, id2) => dispatch(getGeekleagueFixturePronos(id1, id2)),
                setResult: setGeeksPronos,
                setError: setErrorPronos
            })
        }

    }, [geekLeague, fixture, geeksFixturePronogeeks, dispatch])

    return {
        geeksPronos,
        setGeeksPronos,
        errorPronos
    }
}