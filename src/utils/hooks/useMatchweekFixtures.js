import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMatchweekFixtures } from '../../state/actions/seasonActions';

export const useMatchweekFixtures = (season, matchweekNumber) => {
  const [fixtures, setFixtures] = useState(null);
  const [matchweekStarted, setMatchweekStarted] = useState(true);
  const [totalGames, setTotalGames] = useState(null);
  const [gamesFinished, setGamesFinished] = useState(null);

  const dispatch = useDispatch();

  const { seasonMatchweeks, loadingSeason } = useSelector(({ seasonReducer }) => ({
    seasonMatchweeks: seasonReducer.seasonMatchweeks,
    loadingSeason: seasonReducer.loading,
  }));

  useEffect(() => {
    if (season && matchweekNumber) {
      const matchweekDetails = seasonMatchweeks[`${season._id}-${matchweekNumber}`];

      if (!matchweekDetails && !loadingSeason)
        dispatch(getMatchweekFixtures(season, matchweekNumber));
      else if (matchweekDetails) {
        if (setFixtures) setFixtures(matchweekDetails.fixtures);

        if (setMatchweekStarted) setMatchweekStarted(matchweekDetails.hasStarted);

        if (setTotalGames) setTotalGames(matchweekDetails.totalGames);

        if (setGamesFinished) setGamesFinished(matchweekDetails.gamesFinished);
      }
    }
  }, [matchweekNumber, season, seasonMatchweeks, loadingSeason, dispatch]);

  return {
    fixtures,
    matchweekStarted,
    totalGames,
    gamesFinished,
  };
};
