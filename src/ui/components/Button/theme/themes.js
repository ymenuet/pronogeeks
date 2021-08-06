import colors from '../../../theme/colors';
import { themeNames } from '../../../theme/themes';
import kinds from './kinds';

export const lightTheme = {
  [kinds.base]: {
    main: colors.marineBlue,
    contrast: colors.white,
  },
  [kinds.error]: {
    main: colors.red,
    contrast: colors.white,
  },
  [kinds.label]: {
    main: colors.grey,
    constrast: colors.white,
  },
  [kinds.success]: {
    main: colors.darkGreen,
    contrast: colors.white,
  },
  [kinds.warning]: {
    main: colors.yellow,
    contrast: colors.black,
  },
  [kinds.disabled]: {
    main: colors.darkGrey,
    contrast: colors.white,
  },
};

export const darkTheme = {
  ...lightTheme,
};

export default {
  [themeNames.lightTheme]: lightTheme,
  [themeNames.darkTheme]: darkTheme,
};
