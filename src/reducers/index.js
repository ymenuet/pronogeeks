import {
    combineReducers
} from "redux"
import authReducer from './authReducer'
import geekReducer from './geekReducer'
import seasonReducer from './seasonReducer'
import pronogeekReducer from './pronogeekReducer'
import geekleagueReducer from './geekleagueReducer'

export default combineReducers({
    authReducer,
    geekReducer,
    seasonReducer,
    pronogeekReducer,
    geekleagueReducer
})