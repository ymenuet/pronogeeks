import {
    THEMES_OPTIONS
} from '../../ui/theme/themes'
import localStorage from '../../utils/classes/localStorage'
import {
    THEME_PREFERENCE_STORAGE_KEY
} from '../../ui/theme/themes'

export const useThemePreference = () => {
    const themeStorage = localStorage(THEME_PREFERENCE_STORAGE_KEY)
    const userPreference = themeStorage.get()

    if (userPreference) return userPreference

    return THEMES_OPTIONS[0]
}