import darkThemeOptions from '@/themes/darkThemeOptions';
import lightThemeOptions from '@/themes/lightThemeOptions';
import type { PaletteMode, Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);

const THEMES: Record<PaletteMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
export default THEMES;
