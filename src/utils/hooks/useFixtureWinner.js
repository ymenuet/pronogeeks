import { useState, useEffect } from 'react';
import { determineFixtureWinner } from '../helpers';

export const useFixtureWinner = (fixture) => {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (fixture) {
      const winnerToSet = determineFixtureWinner(fixture.goalsHomeTeam, fixture.goalsAwayTeam);
      setWinner(winnerToSet);
    }
  }, [fixture]);

  return winner;
};
