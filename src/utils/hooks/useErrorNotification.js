import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openNotification } from '../helpers';

import { resetAuthError } from '../../state/actions/authActions';
import { resetGeekError } from '../../state/actions/geekActions';
import { resetGeekleagueError } from '../../state/actions/geekleagueActions';
import { resetApiFootballError } from '../../state/actions/apiFootballActions';

const KEYS = {
  AUTH: 'auth',
  GEEK: 'geek',
  GEEKLEAGUE: 'geekleague',
  APIFOOTBALL: 'apiFootball',
};

export const useErrorNotification = () => {
  const dispatch = useDispatch();

  const errors = useSelector((state) => ({
    [KEYS.AUTH]: state.authReducer.error,
    [KEYS.GEEK]: state.geekReducer.error,
    [KEYS.GEEKLEAGUE]: state.geekleagueReducer.error,
    [KEYS.APIFOOTBALL]: state.apiFootballReducer.error,
  }));

  const resets = {
    [KEYS.AUTH]: resetAuthError,
    [KEYS.GEEK]: resetGeekError,
    [KEYS.GEEKLEAGUE]: resetGeekleagueError,
    [KEYS.APIFOOTBALL]: resetApiFootballError,
  };

  useEffect(() => {
    Object.values(KEYS).map((key) => {
      if (errors[key]) {
        openNotification('error', 'Erreur', errors[key]);
        dispatch(resets[key]());
      }
      return key;
    });
  }, [errors, resets, dispatch]);
};
