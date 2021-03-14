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
    getDetailsGeek
} from '../../actions/geekActions'

export const useGeekInfo = geekID => {
    const [geek, setGeek] = useState(null)
    const [errorGeek, setErrorGeek] = useState(false)

    const detailedGeeks = useSelector(({
        geekReducer
    }) => geekReducer.detailedGeeks)

    const dispatch = useDispatch()

    useEffect(() => {
        handleStateWithId({
            id: geekID,
            reducerData: detailedGeeks,
            action: (id) => dispatch(getDetailsGeek(id)),
            setResult: setGeek,
            setError: setErrorGeek
        })
    }, [geekID, detailedGeeks, dispatch])

    return {
        geek,
        errorGeek
    }
}