import {
    useState,
    useEffect
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    setLastMatchweek
} from '../../state/actions/seasonActions'

export const useLastStartedMatchweek = season => {
    const [lastMatchweek, setLastMatchweekLocal] = useState(null)

    const {
        lastMatchweeks,
        loadingSeason
    } = useSelector(({
        seasonReducer
    }) => ({
        lastMatchweeks: seasonReducer.lastMatchweeks,
        loadingSeason: seasonReducer.loading
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        if (season) {
            if (!lastMatchweeks[season._id] && !loadingSeason) dispatch(setLastMatchweek(season))

            else if (lastMatchweeks[season._id]) setLastMatchweekLocal(lastMatchweeks[season._id])
        }
    }, [loadingSeason, season, lastMatchweeks, dispatch])

    return lastMatchweek
}