import {
    combineReducers
} from "redux"
import authReducer from './authReducer'
import geekReducer from './geekReducer'
import seasonReducer from './seasonReducer'
import pronogeekReducer from './pronogeekReducer'

export default combineReducers({
    authReducer,
    geekReducer,
    seasonReducer,
    pronogeekReducer
})