import themeVariant from '@/appLocalStorages/themeVariant';
import FabChangeTheme from '@/providers/MUIThemeV5Provider/FabChangeTheme';
import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import isEqual from 'lodash/isEqual';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import THEMES from './themes';
import type { MUIThemeV5ProviderProps } from './_types';

const MUIThemeV5Provider: FC<MUIThemeV5ProviderProps<any>> = (props) => {
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
    return THEMES[mode];
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
