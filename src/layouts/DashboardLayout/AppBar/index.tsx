import { ASIDE_MENU_WIDTH } from '@/layouts/DashboardLayout/constants';
import { useDashboardLayoutContext } from '@/providers/DashboardLayoutProvider';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useMemo, useCallback } from 'react';

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

  const {
    layoutAction: { toggleAside },
    layoutState: { isAsideOpen, getPageTitle },
  } = useDashboardLayoutContext();

  const memoOpen = useMemo(() => {
    return !!isAsideOpen;
  }, [isAsideOpen]);

  const toggle = useCallback(() => {
    toggleAside?.();
  }, [toggleAside]);

  const bar = useMemo(() => {
    return (
      <AppBarStyled position="absolute" open={memoOpen}>
        <Toolbar sx={{ pr: theme.spacing(3) }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              toggle();
            }}
            sx={{
              mr: theme.spacing(4.5),
              ...(memoOpen ? { display: 'none' } : {}),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBarStyled>
    );
  }, [theme, getPageTitle, memoOpen, toggle]);

  return bar;
};
export default AppBar;
