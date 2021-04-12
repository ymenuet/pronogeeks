import {
    useState,
    useEffect
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    themeNames
} from '../../ui/theme/themes'
import {
    preferredTheme
} from '../../utils/classes/localStorage'

import {
    changeTheme
} from '../../actions/globalActions'

export const useThemePreference = () => {
    const [theme, setTheme] = useState(themeNames.lightTheme)

    const appTheme = useSelector(({
        globalReducer
    }) => globalReducer.appTheme)

    const dispatch = useDispatch()

    useEffect(() => {

        if (appTheme) setTheme(appTheme)

        else {
            const userPreference = preferredTheme.get()
            if (userPreference) {
                setTheme(userPreference)
                dispatch(changeTheme(userPreference))
            }
        }
    }, [appTheme, dispatch])

    return theme
}