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
}, callbacks) => {

    useEffect(() => {
        if (condition) {
            openNotification(type, title, message, duration)
            if (callbacks.length) {
                callbacks.map(({
                    callback,
                    args
                }) => callback(...args))
            }
        }
    }, [condition, type, title, message, duration, callbacks])
}