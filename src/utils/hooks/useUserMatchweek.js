import { useState, useEffect } from 'react';
import { getUserSeasonFromProfile, getUserMatchweekFromProfile } from '../helpers';
import { useUser } from './useUser';

export const useUserMatchweek = ({ seasonID, matchweekNumber, history }) => {
  const [matchweekPoints, setMatchweekPoints] = useState(null);
  const [matchweekBonus, setMatchweekBonus] = useState(null);
  const [matchweekCorrects, setMatchweekCorrects] = useState(null);
  const [newSeason, setNewSeason] = useState(true);

  const { user, isUserConnected } = useUser();

  useEffect(() => {
    if (isUserConnected) {
      const userSeason = getUserSeasonFromProfile(user, seasonID);

      if (!userSeason || !userSeason.favTeam) {
        history.push(`/pronogeeks/${seasonID}`);
      } else {
        setNewSeason(false);
        const userMatchweek = getUserMatchweekFromProfile(userSeason, matchweekNumber);
        if (userMatchweek) {
          setMatchweekPoints(userMatchweek.totalPoints);
          setMatchweekBonus(userMatchweek.bonusPoints);
          setMatchweekCorrects(userMatchweek.numberCorrects);
        } else {
          setMatchweekPoints(0);
          setMatchweekBonus(0);
          setMatchweekCorrects(0);
        }
      }
    }
  }, [history, seasonID, matchweekNumber, user, isUserConnected]);

  return {
    matchweekPoints,
    matchweekBonus,
    matchweekCorrects,
    newSeason,
  };
};
