import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ThemeProviderProps } from '@mui/system';
import lightThemeOptions from './lightThemeOptions';
// import darkThemeOptions from './darkThemeOptions';
import CssBaseline from '@mui/material/CssBaseline';

const lightTheme = createTheme(lightThemeOptions);
// const darkTheme = createTheme(darkThemeOptions);

export type MUIThemeV5ProviderProps<T> = Omit<ThemeProviderProps<T>, 'theme'>;

const MUIThemeV5Provider: React.FC<MUIThemeV5ProviderProps<any>> = (props) => {
  const { children, ...otherProps } = props;
  //TODO here to switch theme
  return (
    <ThemeProvider {...otherProps} theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default MUIThemeV5Provider;
