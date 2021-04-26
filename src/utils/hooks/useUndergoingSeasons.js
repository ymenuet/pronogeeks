import {
    useState,
    useEffect
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    handleStateWithoutId
} from '../helpers/stateHandlers'

import {
    getUndergoingSeasons
} from '../../state/actions/seasonActions'

export const useUndergoingSeasons = () => {
    const [seasons, setSeasons] = useState(null)
    const [errorSeasons, setErrorSeasons] = useState(false)

    const undergoingSeasons = useSelector(({
        seasonReducer
    }) => seasonReducer.undergoingSeasons)

    const dispatch = useDispatch()

    useEffect(() => {
        handleStateWithoutId({
            reducerData: undergoingSeasons,
            action: () => dispatch(getUndergoingSeasons()),
            setResult: setSeasons,
            setError: setErrorSeasons
        })
    }, [undergoingSeasons, dispatch])

    return {
        seasons,
        errorSeasons
    }
}