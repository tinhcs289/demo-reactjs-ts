import type { PaletteMode, Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import globalStyleMaker from './globalStyleMaker';
import darkThemeOptions from './themeOptions/darkThemeOptions';
import lightThemeOptions from './themeOptions/lightThemeOptions';
const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);
const THEMES: Partial<Record<PaletteMode, Theme>> = {
  light: lightTheme,
  dark: darkTheme,
};
export { THEMES, globalStyleMaker };
