import { useState, useEffect } from 'react';

export const useGeekMatchweekPoints = (geek, seasonID, matchweekNumber) => {
  const [matchweekPoints, setMatchweekPoints] = useState(null);
  const [matchweekBonus, setMatchweekBonus] = useState(null);
  const [matchweekCorrects, setMatchweekCorrects] = useState(null);
  const [noPronogeeks, setNoPronogeeks] = useState(false);

  useEffect(() => {
    const setPoints = (geek) => {
      if (
        geek.seasons.length < 1 ||
        geek.seasons.filter((seas) => seas.season.toString() === seasonID.toString()).length < 1 ||
        geek.seasons.filter((seas) => seas.season.toString() === seasonID.toString())[0].matchweeks
          .length < 1 ||
        geek.seasons
          .filter((seas) => seas.season.toString() === seasonID.toString())[0]
          .matchweeks.filter(
            (matchweek) => matchweek.number.toString() === matchweekNumber.toString()
          ).length < 1
      ) {
        return setNoPronogeeks(true);
      }
      setNoPronogeeks(false);
      const seasonUser = geek.seasons.filter(
        (seas) => seas.season.toString() === seasonID.toString()
      )[0];
      const matchweekUser = seasonUser.matchweeks.filter(
        (matchweek) => matchweek.number.toString() === matchweekNumber.toString()
      )[0];
      setMatchweekPoints(matchweekUser.totalPoints);
      setMatchweekBonus(matchweekUser.bonusPoints);
      setMatchweekCorrects(matchweekUser.numberCorrects);
    };
    if (geek) setPoints(geek);
  }, [matchweekNumber, seasonID, geek]);

  return {
    matchweekPoints,
    matchweekBonus,
    matchweekCorrects,
    noPronogeeks,
  };
};
