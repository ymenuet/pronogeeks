import { useState, useEffect } from 'react';
import { hasMatchStarted } from '../helpers';

export const useMatchStarted = (fixture) => {
  const [matchStarted, setMatchStarted] = useState(true);

  useEffect(() => {
    const matchStarted = hasMatchStarted(fixture);
    setMatchStarted(matchStarted);
  }, [fixture]);

  return matchStarted;
};
