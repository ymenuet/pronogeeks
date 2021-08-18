import { useState, useEffect } from 'react';
import { hasMatchStarted } from '../helpers';

export const useMatchStarted = (fixture) => {
  const [matchStarted, setMatchStarted] = useState(true);

  useEffect(() => {
    const hasMatchBegun = hasMatchStarted(fixture);
    setMatchStarted(hasMatchBegun);
  }, [fixture]);

  return matchStarted;
};
