import { CHANGE_THEME } from '../types/global';
import { preferredTheme } from '../../utils/classes/localStorage';

const INITIAL_STATE = {
  appTheme: null,
};

const globalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      preferredTheme.set(action.payload);
      return {
        ...state,
        appTheme: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
