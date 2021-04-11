import colors from './colors'

export const themeNames = {
    lightTheme: 'lightTheme',
    darkTheme: 'darkTheme'
}

export const THEMES_OPTIONS = Object.values(themeNames)

export const THEME_PREFERENCE_STORAGE_KEY = 'Pronogeeks_theme_preference'

const lightTheme = {
    name: themeNames.lightTheme,
    background: colors.white,
    opposite: colors.black,
    base: colors.marineBlue,
    disabled: colors.darkerGrey,
    label: colors.grey,
    blur: colors.grey,
    error: colors.red,
    success: colors.darkGreen,
    warning: colors.yellow,
    spok: colors.yellow,
    cyan: colors.cyan,
    lightPurple: colors.lightPurple,
    darkPurple: colors.darkPurple,
    lightGreen: colors.lightGreen,
    blue: colors.blue,
    magenta: colors.magenta,
}

const darkTheme = {
    ...lightTheme,
    name: themeNames.darkTheme,
    background: colors.black,
    opposite: colors.white,
}

export default {
    [themeNames.lightTheme]: lightTheme,
    [themeNames.darkTheme]: darkTheme,
}