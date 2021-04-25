import colors from './colors'

export const themeNames = {
    lightTheme: 'lightTheme',
    darkTheme: 'darkTheme'
}

const lightTheme = {
    name: themeNames.lightTheme,
    background: colors.white,
    opposite: colors.black,
    base: colors.marineBlue,
    disabled: colors.darkGrey,
    label: colors.grey,
    blur: colors.darkGrey,
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