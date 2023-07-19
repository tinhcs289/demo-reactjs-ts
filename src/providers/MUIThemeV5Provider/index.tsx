import themeVariant from '@/browser/localStorage/themeVariant';
import FabChangeTheme from '@/providers/MUIThemeV5Provider/FabChangeTheme';
import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import isEqual from 'lodash/isEqual';
import { useEffect, useMemo, useRef, useState } from 'react';
import THEMES from './themes';
import type { MUIThemeV5ProviderProps } from './_types';
export default function MUIThemeV5Provider(props: MUIThemeV5ProviderProps<any>) {
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
  const $SwitchThemeFab = useMemo(() => {
    return <FabChangeTheme mode={mode} />;
  }, [mode]);
  const memoTheme = useMemo(() => {
    return THEMES[mode];
  }, [mode]);
  return (
    <ThemeProvider {...otherProps} theme={memoTheme as any}>
      <CssBaseline />
      {children}
      {$SwitchThemeFab}
    </ThemeProvider>
  );
}
