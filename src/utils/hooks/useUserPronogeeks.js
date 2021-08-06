import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openNotification } from '../helpers';
import { useUser } from '.';

import {
  getUserMatchweekPronos,
  resetMatchweekSaveAndErrorState,
} from '../../state/actions/pronogeekActions';

export const useUserPronogeeks = (seasonID, matchweekNumber) => {
  const [modifiedTotal, setModifiedTotal] = useState(0);
  const [savingAll, setSavingAll] = useState(false);
  const [saveAllSuccess, setSaveAllSuccess] = useState(false);
  const [errorProno, setErrorProno] = useState(false);

  const { user, isUserConnected } = useUser();

  const { userPronogeeks } = useSelector((state) => ({
    userPronogeeks: state.pronogeekReducer.userPronogeeks,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const pronogeeks = userPronogeeks[`${seasonID}-${matchweekNumber}`];

    if (isUserConnected && !pronogeeks)
      dispatch(getUserMatchweekPronos(user._id, seasonID, matchweekNumber));
    else if (pronogeeks && Object.keys(pronogeeks).length) {
      const modifiedTotal = Object.values(pronogeeks).reduce((total, currentProno) => {
        if (currentProno.modified) return total + 1;
        return total;
      }, 0);
      setModifiedTotal(modifiedTotal);

      if (pronogeeks.saving) setSavingAll(true);

      if (pronogeeks.saved) {
        dispatch(resetMatchweekSaveAndErrorState(seasonID, matchweekNumber));
        setSavingAll(false);
        setSaveAllSuccess(true);
        setTimeout(() => setSaveAllSuccess(false), 4000);
        openNotification(
          'success',
          'Sauvegarde réussie',
          `Pronogeeks de la journée ${matchweekNumber} enregistrés.`
        );
      }

      if (pronogeeks.error && !pronogeeks.error.type) setErrorProno(pronogeeks.error);

      if (pronogeeks.error && pronogeeks.error.type) {
        const { type, title, message } = pronogeeks.error;
        dispatch(resetMatchweekSaveAndErrorState(seasonID, matchweekNumber));
        setSavingAll(false);
        openNotification(type, title, message);
      }
    } else setModifiedTotal(0);
  }, [user, isUserConnected, userPronogeeks, seasonID, matchweekNumber, dispatch]);

  return {
    modifiedTotal,
    savingAll,
    saveAllSuccess,
    errorProno,
  };
};
