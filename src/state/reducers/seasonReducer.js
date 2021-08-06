import {
  GET_UNDERGOING_SEASONS,
  GET_SEASONS_FOR_NEW_GEEKLEAGUE,
  ADD_SEASON,
  ADD_MATCHWEEK,
  SET_NEXT_MATCHWEEK,
  SET_LAST_MATCHWEEK,
  CLOSE_SEASON,
  SEASON_TARGETED_RESET,
  LOADING,
  ERROR,
} from '../types/seasonTypes';
import { LOGOUT, DELETE_ACCOUNT } from '../types/authTypes';

const done = {
  loading: false,
  error: false,
};

const INITIAL_STATE = {
  undergoingSeasons: {},
  upcomingAndUndergoingSeasons: {},
  detailedSeasons: {},
  seasonMatchweeks: {},
  nextMatchweeks: {},
  lastMatchweeks: {},
  seasonClosed: null,
  ...done,
};

const seasonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_UNDERGOING_SEASONS:
      return {
        ...state,
        undergoingSeasons: action.payload,
        ...done,
      };
    case GET_SEASONS_FOR_NEW_GEEKLEAGUE:
      return {
        ...state,
        upcomingAndUndergoingSeasons: action.payload,
        ...done,
      };
    case ADD_SEASON:
      return {
        ...state,
        detailedSeasons: action.payload,
        ...done,
      };
    case ADD_MATCHWEEK:
      return {
        ...state,
        seasonMatchweeks: action.payload,
        ...done,
      };
    case SET_NEXT_MATCHWEEK:
      return {
        ...state,
        nextMatchweeks: action.payload,
        ...done,
      };
    case SET_LAST_MATCHWEEK:
      return {
        ...state,
        lastMatchweeks: action.payload,
        ...done,
      };
    case CLOSE_SEASON:
      return {
        ...state,
        seasonClosed: action.payload,
        ...done,
      };
    case SEASON_TARGETED_RESET:
      return {
        ...state,
        ...action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      return INITIAL_STATE;
    case DELETE_ACCOUNT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default seasonReducer;
