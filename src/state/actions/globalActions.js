import {
    CHANGE_THEME
} from '../types/global'

export const changeTheme = theme => dispatch => {
    dispatch({
        type: CHANGE_THEME,
        payload: theme
    })
}