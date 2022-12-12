import themeVariant from '@/appLocalStorages/themeVariant';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import type { PaletteMode, SxProps } from '@mui/material';
import Fab from '@mui/material/Fab';
import type { FC } from 'react';
import { useCallback, useMemo } from 'react';

const fabStyle: SxProps = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const FabChangeTheme: FC<{ mode?: PaletteMode }> = (props) => {
  const { mode } = props;

  const handleChangeTheme = useCallback((variant: PaletteMode) => {
    return () => {
      themeVariant.set(variant);
    };
  }, []);

  const switchThemeButton = useMemo(() => {
    if (mode === 'light')
      return (
        <Fab color="primary" size="small" onClick={handleChangeTheme('dark')} sx={fabStyle}>
          <DarkModeIcon />
        </Fab>
      );

    if (mode === 'dark')
      return (
        <Fab color="primary" size="small" onClick={handleChangeTheme('light')} sx={fabStyle}>
          <LightModeIcon />
        </Fab>
      );

    return null;
  }, [mode, handleChangeTheme]);

  return switchThemeButton;
};
export default FabChangeTheme;
