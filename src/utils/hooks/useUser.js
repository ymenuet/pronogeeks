import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isConnected } from '../helpers';

export const useUser = () => {
  const [isUserConnected, setIsUserConnected] = useState(0);

  const { user } = useSelector(({ authReducer }) => authReducer);

  useEffect(() => {
    const isGeekConnected = isConnected(user);
    setIsUserConnected(isGeekConnected);
  }, [user]);

  return {
    user,
    isUserConnected,
  };
};
