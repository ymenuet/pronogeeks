import colors from "./colors";

export const themeNames = {
  lightTheme: "lightTheme",
  darkTheme: "darkTheme",
};

const lightTheme = {
  ...colors,
  name: themeNames.lightTheme,
  background: colors.white,
  opposite: colors.black,
  base: colors.marineBlue,
  disabled: colors.darkGrey,
  label: colors.darkerGrey,
  blur: colors.darkGrey,
  error: colors.red,
  success: colors.darkGreen,
  warning: colors.yellow,
  spok: colors.yellow,
};

const darkTheme = {
  ...lightTheme,
  name: themeNames.darkTheme,
  background: colors.black,
  opposite: colors.white,
  label: colors.grey,
};

export const themeSelector = {};

Object.keys(lightTheme).map((key) => {
  themeSelector[key] = ({ theme }) => theme[key];
  return key;
});

export default {
  [themeNames.lightTheme]: lightTheme,
  [themeNames.darkTheme]: darkTheme,
};
