import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeProviderProps } from '@mui/system';
import customThemeOptions from './customThemeOptions';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme(customThemeOptions);

export type MUIThemeV5ProviderProps<T> = Omit<ThemeProviderProps<T>, 'theme'>;

const MUIThemeV5Provider: React.FC<MUIThemeV5ProviderProps<any>> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <ThemeProvider {...otherProps} theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default MUIThemeV5Provider;
