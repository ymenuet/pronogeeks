import {
    useState,
    useEffect
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    useUser
} from '.'
import {
    isEmpty
} from '../functions'


import {
    getUserLeagues
} from '../../actions/geekleagueActions'

export const useUserGeekLeagues = () => {
    const [userGeekLeagues, setUserGeekLeagues] = useState(null)
    const [errorGeekLeagues, setErrorGeekLeagues] = useState(null)

    const {
        user,
        isUserConnected
    } = useUser()

    const geekleagues = useSelector(({
        geekleagueReducer
    }) => geekleagueReducer.geekleagues)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isUserConnected) {
            const geekleaguesNotLoadingNorWithError = !isEmpty(geekleagues) &&
                !geekleagues.loading &&
                !geekleagues.error &&
                !geekleagues.empty

            if (isEmpty(geekleagues)) dispatch(getUserLeagues())

            else if (
                geekleaguesNotLoadingNorWithError &&
                user.geekLeagues.length !== Object.keys(geekleagues).length
            ) dispatch(getUserLeagues())

            else if (
                geekleaguesNotLoadingNorWithError &&
                user.geekLeagues.length === Object.keys(geekleagues).length
            ) setUserGeekLeagues(Object.values(geekleagues).filter(league => !!league._id))

            else if (geekleagues.empty) setUserGeekLeagues([])

            else if (geekleagues.error) setErrorGeekLeagues(geekleagues.error)
        }

    }, [user, isUserConnected, geekleagues, dispatch])

    return {
        userGeekLeagues,
        errorGeekLeagues
    }
}