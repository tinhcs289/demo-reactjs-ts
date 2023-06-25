import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { SxProps, useTheme } from '@mui/material/styles';
import { useCallback, useMemo } from 'react';
export default function ButtonMenu() {
  const theme = useTheme();
  const [isAsideOpen, toggleAside] = useDashboardLayout((s) => s.isAsideOpen);
  const memoOpen = useMemo(() => !!isAsideOpen, [isAsideOpen]);
  const toggle = useCallback(() => {
    toggleAside({ isAsideOpen: !isAsideOpen });
  }, [toggleAside, isAsideOpen]);
  const style: SxProps = useMemo(() => {
    return {
      mr: theme.spacing(4.5),
      ml: 0,
      ...(memoOpen ? { display: 'none' } : {}),
    };
  }, [theme, memoOpen]);
  const $Button = useMemo(() => {
    return (
      <IconButton edge="start" color="inherit" onClick={toggle} sx={style}>
        <MenuIcon />
      </IconButton>
    );
  }, [style, toggle]);
  return $Button;
}
