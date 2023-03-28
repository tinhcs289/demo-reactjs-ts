import darkThemeOptions from '@/themes/darkThemeOptions';
import lightThemeOptions from '@/themes/lightThemeOptions';
import materializeLightThemeOptions from '@/themes/materializeLightThemeOptions';
import type { PaletteMode, Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);
const materializeLightTheme = createTheme(materializeLightThemeOptions);
const THEMES: Partial<Record<PaletteMode | `materialize:${PaletteMode}`, Theme>> = {
  light: lightTheme,
  dark: darkTheme,
  'materialize:light': materializeLightTheme,
};
export default THEMES;
