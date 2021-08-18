import { useEffect } from 'react';
import { openNotification } from '../helpers';

export const useNotification = (
  condition,
  { type = 'success', title = 'Succès', message, duration },
  callback
) => {
  useEffect(() => {
    if (condition) {
      openNotification(type, title, message, duration);
      if (callback) callback();
    }
    /* eslint-disable-next-line */
  }, [condition, type, title, message, duration]);
};
