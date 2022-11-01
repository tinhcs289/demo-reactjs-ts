import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeProviderProps } from '@mui/system';
import customThemeOptions from './customThemeOptions';

const theme = createTheme(customThemeOptions);

export type MUIThemeV5ProviderProps<T> = Omit<ThemeProviderProps<T>, 'theme'>;

const MUIThemeV5Provider: React.FC<MUIThemeV5ProviderProps<any>> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <ThemeProvider {...otherProps} theme={theme}>
      {children}
    </ThemeProvider>
  );
};
export default MUIThemeV5Provider;
