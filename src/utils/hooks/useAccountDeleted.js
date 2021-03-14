import {
    useEffect
} from 'react'
import {
    useSelector
} from 'react-redux'
import {
    openNotification
} from '../functions'

export const useAccountDeleted = () => {
    const accountDeleted = useSelector(({
        authReducer
    }) => authReducer.accountDeleted)

    useEffect(() => {
        if (accountDeleted) openNotification('success', 'Ton compte a bien été supprimé.')
    }, [accountDeleted])
}