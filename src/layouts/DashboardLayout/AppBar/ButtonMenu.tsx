import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { SxProps, useTheme } from '@mui/material/styles';
import type { FC } from 'react';
import { memo, useCallback, useMemo } from 'react';

const ButtonMenu: FC<any> = (props) => {
  const theme = useTheme();

  const [isAsideOpen, toggleAside] = useDashboardLayout((s) => s.isAsideOpen);

  const memoOpen = useMemo(() => {
    return !!isAsideOpen;
  }, [isAsideOpen]);

  const toggle = useCallback(() => {
    toggleAside({ isAsideOpen: !isAsideOpen });
  }, [toggleAside, isAsideOpen]);

  const style: SxProps = useMemo(() => {
    return {
      mr: theme.spacing(4.5),
      ...(memoOpen ? { display: 'none' } : {}),
    };
  }, [theme, memoOpen]);

  const button = useMemo(() => {
    return (
      <IconButton edge="start" color="inherit" onClick={toggle} sx={style}>
        <MenuIcon />
      </IconButton>
    );
  }, [style, toggle]);

  return button;
};
export default memo(ButtonMenu) as FC<any>;
