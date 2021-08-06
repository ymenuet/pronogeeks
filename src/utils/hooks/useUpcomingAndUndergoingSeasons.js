import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleStateWithoutId } from '../helpers/stateHandlers';

import { getUpcomingAndUndergoingSeasons } from '../../state/actions/seasonActions';

export const useUpcomingAndUndergoingSeasons = () => {
  const [seasons, setSeasons] = useState(null);
  const [errorSeasons, setErrorSeasons] = useState(false);

  const { upcomingAndUndergoingSeasons } = useSelector(({ seasonReducer }) => seasonReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    handleStateWithoutId({
      reducerData: upcomingAndUndergoingSeasons,
      action: () => dispatch(getUpcomingAndUndergoingSeasons()),
      setResult: setSeasons,
      setError: setErrorSeasons,
    });
  }, [upcomingAndUndergoingSeasons, dispatch]);

  return {
    seasons,
    errorSeasons,
  };
};
