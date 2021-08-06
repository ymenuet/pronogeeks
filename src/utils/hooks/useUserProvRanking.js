import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '.';

export const useUserProvRanking = (season) => {
  const [userProvRanking, setUserProvRanking] = useState(null);
  const [userWithoutRanking, setUserWithoutRanking] = useState(false);

  const { user, isUserConnected } = useUser();

  const history = useHistory();

  useEffect(() => {
    if (isUserConnected && season) {
      const seasonUser = user.seasons.filter((userSeason) => userSeason.season._id === season._id);
      if (seasonUser.length) {
        const userProvRanking = seasonUser[0].provisionalRanking;
        if (userProvRanking.length) setUserProvRanking(userProvRanking);
        else {
          setUserWithoutRanking(true);
          if (season.provRankingOpen) setUserProvRanking(season.rankedTeams);
          else setUserProvRanking([]);
        }
      } else history.push(`/pronogeeks/${season._id}`);
    }
  }, [history, user, isUserConnected, season]);

  return {
    userProvRanking,
    userWithoutRanking,
    setUserProvRanking,
  };
};
