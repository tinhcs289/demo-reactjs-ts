import ButtonLanguage from '@/layouts/DashboardLayout/AppBar/ButtonLanguage';
import { ASIDE_MENU_WIDTH } from '@/layouts/DashboardLayout/constants';
import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import { styled, SxProps, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import ButtonLogout from './ButtonLogout';
import ButtonMenu from './ButtonMenu';
import PageTitle from './PageTitle';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: ASIDE_MENU_WIDTH,
    width: `calc(100% - ${ASIDE_MENU_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar: FC<any> = (props) => {
  const theme = useTheme();

  const [isAsideOpen] = useDashboardLayout((s) => s.isAsideOpen);

  const memoOpen = useMemo(() => {
    return !!isAsideOpen;
  }, [isAsideOpen]);

  const style: SxProps = useMemo(() => {
    return { pr: theme.spacing(3) };
  }, [theme]);

  return (
    <AppBarStyled position="absolute" open={memoOpen}>
      <Toolbar sx={style}>
        {useMemo(
          () => (
            <ButtonMenu />
          ),
          [],
        )}
        {useMemo(
          () => (
            <PageTitle />
          ),
          [],
        )}
        {useMemo(
          () => (
            <ButtonLanguage />
          ),
          [],
        )}
        {useMemo(
          () => (
            <ButtonLogout />
          ),
          [],
        )}
      </Toolbar>
    </AppBarStyled>
  );
};
export default memo(AppBar) as FC<AppBarProps>;
