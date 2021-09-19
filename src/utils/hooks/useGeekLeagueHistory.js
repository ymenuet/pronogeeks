import { useState, useEffect } from 'react';
import { useUser } from './useUser';
import { preferredSeasonGeekleague } from '../classes/localStorage';

export const useGeekLeagueHistory = (seasonID) => {
  const [geekLeagueHistoryID, setGeekLeagueHistoryID] = useState(null);

  const { user, isUserConnected } = useUser();

  useEffect(() => {
    const leagueID = preferredSeasonGeekleague.get(seasonID);
    if (leagueID) setGeekLeagueHistoryID(leagueID);
    else if (isUserConnected) {
      const geekLeague = user.geekLeagues.find(({ season }) => season === seasonID);
      if (geekLeague) {
        const geekLeagueID = geekLeague._id;
        setGeekLeagueHistoryID(geekLeagueID);
        preferredSeasonGeekleague.set(geekLeagueID, seasonID);
      }
    }
  }, [user, isUserConnected, seasonID]);

  return {
    geekLeagueHistoryID,
    user,
  };
};
