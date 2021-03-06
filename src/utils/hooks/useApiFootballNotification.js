import {
    useEffect
} from 'react'
import {
    useSelector
} from 'react-redux'
import {
    openNotification
} from '../functions'

export const useApiFootballNotification = () => {
    const {
        statusUpdated,
        oddsUpdated,
        warningMessage
    } = useSelector(state => ({
        statusUpdated: state.apiFootballReducer.statusUpdated,
        oddsUpdated: state.apiFootballReducer.oddsUpdated,
        warningMessage: state.apiFootballReducer.warningMessage,
    }))

    useEffect(() => {
        if (statusUpdated) openNotification('success', 'Scores et dates actualisés')
    }, [statusUpdated])


    useEffect(() => {
        if (oddsUpdated) openNotification('success', 'Cotes mises à jour')
    }, [oddsUpdated])


    useEffect(() => {
        if (warningMessage) openNotification('warning', 'Actualisation abortée', warningMessage)
    }, [warningMessage])
}