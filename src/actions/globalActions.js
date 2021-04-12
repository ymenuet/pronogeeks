import {
    CHANGE_THEME
} from '../utils/reduxTypes/global'

export const changeTheme = theme => dispatch => {
    dispatch({
        type: CHANGE_THEME,
        payload: theme
    })
}