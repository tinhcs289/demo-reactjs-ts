import themeVariant from '@/appLocalStorages/themeVariant';
import FabChangeTheme from '@/providers/MUIThemeV5Provider/FabChangeTheme';
import type { PaletteMode, Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ThemeProviderProps } from '@mui/system';
import isEqual from 'lodash/isEqual';
import { useEffect, useMemo, useRef, useState } from 'react';
import darkThemeOptions from './darkThemeOptions';
import lightThemeOptions from './lightThemeOptions';

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);

const VARIANTS: Record<PaletteMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export type MUIThemeV5ProviderProps<T> = Omit<ThemeProviderProps<T>, 'theme'>;

const MUIThemeV5Provider: React.FC<MUIThemeV5ProviderProps<any>> = (props) => {
  const { children, ...otherProps } = props;

  const [mode, setMode] = useState<PaletteMode>(themeVariant.get() || 'light');

  const modeRef = useRef(mode);

  useEffect(() => {
    if (isEqual(modeRef.current, mode)) return;
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    themeVariant.onChange((event, detail) => {
      if (!detail?.value || isEqual(detail.value, modeRef.current)) return;
      setMode(detail.value);
    });
  }, []);

  const switchThemeButton = useMemo(() => {
    return <FabChangeTheme mode={mode} />;
  }, [mode]);

  const memoTheme = useMemo(() => {
    return VARIANTS[mode];
  }, [mode]);

  return (
    <ThemeProvider {...otherProps} theme={memoTheme}>
      <CssBaseline />
      {children}
      {switchThemeButton}
    </ThemeProvider>
  );
};
export default MUIThemeV5Provider;
