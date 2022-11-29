import { ASIDE_MENU_WIDTH } from '@/layouts/DashboardLayout/constants';
import { useDashboardLayoutContext } from '@/providers/DashboardLayoutProvider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useCallback, useEffect, useMemo } from 'react';

const DrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: ASIDE_MENU_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const AsideDrawer: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;
  const { layoutAction, layoutState } = useDashboardLayoutContext();

  const isAsideOpen = useMemo(() => {
    return !!layoutState?.isAsideOpen;
  }, [layoutState?.isAsideOpen]);

  const toggleAside = useCallback(() => {
    layoutAction?.toggleAside?.();
  }, [layoutAction]);

  const isMediumScreenOrLower = useMediaQuery((t: Theme) => t?.breakpoints?.down?.('md'));

  useEffect(() => {
    if ((isMediumScreenOrLower && isAsideOpen) || (!isMediumScreenOrLower && !isAsideOpen)) {
      toggleAside();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMediumScreenOrLower]);

  return (
    <DrawerStyled variant="permanent" open={isAsideOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton
          onClick={() => {
            toggleAside();
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">{children}</List>
    </DrawerStyled>
  );
};
export default AsideDrawer;
