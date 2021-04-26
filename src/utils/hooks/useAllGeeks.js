import {
    useEffect,
    useState
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    handleStateWithoutId
} from '../stateHandlers'
import {
    sortGeeksByUsername,
} from '../helpers'
import {
    useUser
} from '.'

import {
    getAllGeeks
} from '../../actions/geekActions'

export const useAllGeeks = geekLeague => {
    const [geeks, setGeeks] = useState([])
    const [geeksObject, setGeeksObject] = useState(null)
    const [errorGeeks, setErrorGeeks] = useState(false)

    const {
        user
    } = useUser()

    const allGeeks = useSelector(({
        geekReducer
    }) => geekReducer.allGeeks)

    const dispatch = useDispatch()

    useEffect(() => {
        handleStateWithoutId({
            reducerData: allGeeks,
            action: () => dispatch(getAllGeeks()),
            setResult: setGeeksObject,
            setError: setErrorGeeks
        })

    }, [allGeeks, dispatch])

    useEffect(() => {
        if (geeksObject) {
            const rawGeeks = Object.values(geeksObject)

            if (!geekLeague) {
                const geeks = sortGeeksByUsername(rawGeeks)
                    .filter(geek => geek._id !== user._id)
                setGeeks(geeks)

            } else {
                let filteredGeeks = rawGeeks
                    .filter(geek => {
                        let result = true
                        geekLeague.geeks.map(leagueGeek => {
                            if (leagueGeek._id.toString() === geek._id.toString()) result = false
                            return leagueGeek
                        })
                        return result
                    })
                const geeks = sortGeeksByUsername(filteredGeeks)
                setGeeks(geeks)
            }
        }

    }, [geeksObject, geekLeague, user._id])

    return {
        geeks,
        errorGeeks,
        loadingGeeks: allGeeks.loading
    }
}