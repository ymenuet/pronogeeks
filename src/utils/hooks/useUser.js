import {
    useState,
    useEffect
} from 'react'
import {
    useSelector
} from 'react-redux'
import {
    isConnected
} from '../helpers'

export const useUser = () => {
    const [isUserConnected, setIsUserConnected] = useState(0)

    const {
        user
    } = useSelector(({
        authReducer
    }) => authReducer)

    useEffect(() => {
        const isUserConnected = isConnected(user)
        setIsUserConnected(isUserConnected)
    }, [user])

    return {
        user,
        isUserConnected
    }
}