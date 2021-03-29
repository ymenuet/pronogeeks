import {
    useEffect
} from 'react'
import {
    openNotification
} from '../functions'

export const useNotification = (condition, {
    type = 'success',
    title = 'Succès',
    message,
    duration
}, callback) => {

    useEffect(() => {
        if (condition) {
            openNotification(type, title, message, duration)
            callback && callback()
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [condition, type, title, message, duration])
}