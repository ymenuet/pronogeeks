import colors from './colors'

export const lightTheme = {
    background: colors.white,
    opposite: colors.black,
    base: colors.marineBlue,
    disabled: colors.grey,
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

export const darkTheme = {
    ...lightTheme,
    background: colors.black,
    opposite: colors.white,
}

const themes = {
    lightTheme,
    darkTheme
}

export const THEMES_OPTIONS = Object.keys(themes)

export default themes