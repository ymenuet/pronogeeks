import {
    combineReducers
} from "redux"
import authReducer from './authReducer'
import geekReducer from './geekReducer'

export default combineReducers({
    authReducer,
    geekReducer
})