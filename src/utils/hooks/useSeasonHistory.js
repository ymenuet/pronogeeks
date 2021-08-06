import { useState, useEffect } from 'react';
import { useUser } from '.';

export const useSeasonHistory = () => {
  const [seasonFromUserHistory, setSeasonFromUserHistory] = useState(null);

  const { user, isUserConnected } = useUser();

  useEffect(() => {
    if (isUserConnected && user.seasons.length > 0) {
      const season = user.seasons[user.seasons.length - 1];
      setSeasonFromUserHistory(season);
    }
  }, [user, isUserConnected]);

  return seasonFromUserHistory;
};
