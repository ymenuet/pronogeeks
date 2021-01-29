import {
    combineReducers
} from "redux"
import authReducer from './authReducer'
import geekReducer from './geekReducer'
import seasonReducer from './seasonReducer'

export default combineReducers({
    authReducer,
    geekReducer,
    seasonReducer
})