import type { PaletteMode, Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import darkThemeOptions from './themeOptions/darkThemeOptions';
import lightThemeOptions from './themeOptions/lightThemeOptions';
export { default as globalStyleMaker } from './globalStyleMaker';
const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);
export const THEMES: Partial<Record<PaletteMode, Theme>> = {
  light: lightTheme,
  dark: darkTheme,
};
