import {
    notification
} from 'antd'

import constants from '../../constants'

export default (type, title, message, duration = constants.NOTIFICATION_DEFAULT_DURATION_SECONDS) => {
    notification[type]({
        message: title,
        description: message,
        duration: duration,
        placement: 'bottomRight',
        className: 'notification-box'
    })
}