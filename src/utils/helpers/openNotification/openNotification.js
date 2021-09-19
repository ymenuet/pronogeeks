import { notification } from 'antd';

import { NOTIFICATION_DEFAULT_DURATION_SECONDS } from '../../constants/general';

export default (type, title, message, duration = NOTIFICATION_DEFAULT_DURATION_SECONDS) => {
  notification[type]({
    message: title,
    description: message,
    duration,
    placement: 'bottomRight',
    className: 'notification-box',
  });
};
