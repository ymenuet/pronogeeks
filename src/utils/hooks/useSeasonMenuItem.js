import {
    useEffect,
    useState
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    getSeasonMenuItem
} from '../../state/actions/seasonActions'

export const useSeasonMenuItem = () => {
    const [seasonID, setSeason] = useState('')

    const seasonMenuItem = useSelector(({
        seasonReducer
    }) => seasonReducer.seasonMenuItem)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!seasonMenuItem) dispatch(getSeasonMenuItem())
        else setSeason(seasonMenuItem)
            /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [seasonMenuItem])

    return seasonID
}