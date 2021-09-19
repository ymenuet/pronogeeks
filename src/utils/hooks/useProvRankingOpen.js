import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PROV_RANKING_MATCHWEEK_LIMIT } from '../constants/general';

import { closeProvRankings } from '../../state/actions/seasonActions';

export const useProvRankingOpen = (season) => {
  const [provRankingOpen, setProvRankingOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (season && season.provRankingOpen) {
      const matchweek7Dates = season.fixtures
        .filter(({ matchweek }) => matchweek === PROV_RANKING_MATCHWEEK_LIMIT)
        .map(({ date }) => new Date(date));
      const matchweek7HasStarted = Date.now() > Math.min(...matchweek7Dates);

      if (matchweek7HasStarted) {
        dispatch(closeProvRankings(season._id));
        setProvRankingOpen(false);
      } else setProvRankingOpen(true);
    }
  }, [season, dispatch]);

  return provRankingOpen;
};
