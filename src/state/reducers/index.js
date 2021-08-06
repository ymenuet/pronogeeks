import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import authReducer from './authReducer';
import geekReducer from './geekReducer';
import seasonReducer from './seasonReducer';
import pronogeekReducer from './pronogeekReducer';
import geekleagueReducer from './geekleagueReducer';
import apiFootballReducer from './apiFootballReducer';

export default combineReducers({
  globalReducer,
  authReducer,
  geekReducer,
  seasonReducer,
  pronogeekReducer,
  geekleagueReducer,
  apiFootballReducer,
});
