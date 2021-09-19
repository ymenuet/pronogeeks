import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { RankingOneGeek } from '..';
import { rankGeeks } from '../../utils/helpers';
import { useUser } from '../../utils/hooks';
import { SIZE_GENERAL_RANKING } from '../../utils/constants/general';
import { UserModel } from '../../utils/models';

const RankGeeks = ({ players, seasonID, generalRanking, matchweek }) => {
  const [ranking, setRanking] = useState(null);
  const [userRank, setUserRank] = useState(null);

  const { user, isUserConnected } = useUser();

  useEffect(() => {
    if (players) {
      if (!generalRanking) {
        const rankingToSet = rankGeeks(players, seasonID, matchweek);
        setRanking(rankingToSet);
      } else setRanking(players.slice(0, SIZE_GENERAL_RANKING));
    }
  }, [players, seasonID, matchweek, setRanking, generalRanking]);

  useEffect(() => {
    const setUserRanking = (geek, oneRanking) => {
      let indexUser = oneRanking.map((player) => player._id).indexOf(geek._id);
      while (oneRanking[indexUser].tied) indexUser -= 1;
      setUserRank(indexUser + 1);
    };

    if (isUserConnected) {
      if (!generalRanking && ranking) setUserRanking(user, ranking);
      else if (generalRanking) setUserRanking(user, players);
    }
  }, [user, isUserConnected, ranking, players, generalRanking]);

  const getRank = (geeks, index) => {
    let i = index;
    while (geeks[i].tied) i -= 1;
    return i + 1;
  };

  return ranking ? (
    <ul
      className={`list-group list-group-flush ${
        generalRanking ? 'season-ranking' : 'geekleague-ranking-detail'
      }`}
    >
      {userRank > 1 && (
        <RankingOneGeek
          user={user}
          geek={user}
          rank={userRank}
          seasonID={seasonID}
          matchweek={matchweek}
          header
        />
      )}

      {ranking.map((player, index) => (
        <RankingOneGeek
          key={player._id}
          user={user}
          geek={player}
          rank={getRank(ranking, index)}
          seasonID={seasonID}
          matchweek={matchweek}
        />
      ))}
    </ul>
  ) : null;
};

RankGeeks.defaultProps = {
  generalRanking: false,
  matchweek: undefined,
};

RankGeeks.propTypes = {
  players: PropTypes.arrayOf(UserModel).isRequired,
  seasonID: PropTypes.string.isRequired,
  generalRanking: PropTypes.bool,
  matchweek: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RankGeeks;
