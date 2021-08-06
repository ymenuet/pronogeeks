import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNextMatchweek } from '../../state/actions/seasonActions';

export const useSoonerMatchweek = (matchweekNumber, lastMatchweek, season) => {
  const [matchweek, setMatchweek] = useState(parseInt(matchweekNumber));

  const { nextMatchweeks, loadingSeason } = useSelector(({ seasonReducer }) => ({
    nextMatchweeks: seasonReducer.nextMatchweeks,
    loadingSeason: seasonReducer.loading,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!matchweekNumber && season) {
      if (!nextMatchweeks[season._id] && !loadingSeason) dispatch(setNextMatchweek(season));
      else if (nextMatchweeks[season._id] && lastMatchweek)
        setMatchweek(Math.min(nextMatchweeks[season._id], lastMatchweek));
    }
  }, [matchweekNumber, loadingSeason, season, nextMatchweeks, lastMatchweek, dispatch]);

  return {
    matchweek,
    setMatchweek,
  };
};
