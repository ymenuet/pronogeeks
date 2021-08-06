import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleStateWithId } from '../helpers/stateHandlers';
import { useUser } from '.';

import { getSeasonPlayers } from '../../state/actions/geekActions';

export const useSeasonPlayersRanking = (season) => {
  const [intermediateRanking, setIntermediateRanking] = useState(null);
  const [seasonRanking, setSeasonRanking] = useState(null);
  const [errorRanking, setErrorRanking] = useState(null);

  const { user, isUserConnected } = useUser();

  const seasonGeeksRankings = useSelector(({ geekReducer }) => geekReducer.seasonGeeksRankings);

  const dispatch = useDispatch();

  useEffect(() => {
    if (season && season._id) {
      handleStateWithId({
        id: season._id,
        reducerData: seasonGeeksRankings,
        action: (id) => dispatch(getSeasonPlayers(id)),
        setResult: setIntermediateRanking,
        setError: setErrorRanking,
      });
    }
  }, [season, seasonGeeksRankings, dispatch]);

  useEffect(() => {
    if (intermediateRanking && isUserConnected && user.seasons.length) {
      const rankedGeeks = intermediateRanking.map((geek) => {
        if (geek._id === user._id)
          return {
            ...geek,
            ...user,
          };
        return geek;
      });
      setSeasonRanking(rankedGeeks);
    }
  }, [user, isUserConnected, intermediateRanking]);

  return {
    seasonRanking,
    setSeasonRanking,
    errorRanking,
  };
};
