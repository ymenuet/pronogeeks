import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from './useUser';

import { setProfile } from '../../state/actions/authActions';

export const useCurrentUserProfile = () => {
  const { isUserConnected, user } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUserConnected) dispatch(setProfile());
  }, [isUserConnected, dispatch]);

  return {
    isUserConnected,
    user,
  };
};
