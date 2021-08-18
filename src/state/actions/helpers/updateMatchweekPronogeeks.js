import { ADD_USER_PRONOGEEKS } from '../../types/pronogeekTypes';
import { PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY } from '../../reducers/keys/pronogeek';
import { copyReducer } from '../../../utils/helpers';

export default ({ pronogeeks, seasonID, matchweekNumber, dispatch, getState }) => {
  const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY);
  newPronogeeks[`${seasonID}-${matchweekNumber}`] = {};

  pronogeeks.map((pronogeek) => {
    newPronogeeks[`${seasonID}-${matchweekNumber}`][pronogeek.fixture] = pronogeek;
    return pronogeek;
  });

  dispatch({
    type: ADD_USER_PRONOGEEKS,
    payload: newPronogeeks,
  });
};
