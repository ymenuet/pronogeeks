import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getGeekMatchweekPronos } from '../../state/actions/pronogeekActions';

export const useGeekMatchweekPronos = (geekID, seasonID, matchweekNumber) => {
  const geeksMatchweekPronogeeks = useSelector(
    ({ pronogeekReducer }) => pronogeekReducer.geeksMatchweekPronogeeks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!geeksMatchweekPronogeeks[`${geekID}-${seasonID}-${matchweekNumber}`])
      dispatch(getGeekMatchweekPronos(geekID, seasonID, matchweekNumber));
  }, [geekID, seasonID, matchweekNumber, geeksMatchweekPronogeeks, dispatch]);
};
