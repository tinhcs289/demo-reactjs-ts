import { ASIDE_MENU_WIDTH } from '@/layouts/DashboardLayout/constants';
import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useMemo } from 'react';

const DrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
      '& div.MuiListItemIcon-root': {
        minWidth: theme.spacing(4),
      },
    },
  })
);

const AsideDrawer: FC<{ children?: ReactNode }> = (props) => {
  const { children } = props;
  const [isAsideOpen, setIsAsideOpen] = useDashboardLayout((s) => s.isAsideOpen);

  const toggleAside = useCallback(() => {
    setIsAsideOpen({ isAsideOpen: !isAsideOpen });
  }, [setIsAsideOpen, isAsideOpen]);

  const isMediumScreenOrLower = useMediaQuery((t: Theme) => t?.breakpoints?.down?.('md'));

  useEffect(() => {
    if ((isMediumScreenOrLower && isAsideOpen) || (!isMediumScreenOrLower && !isAsideOpen)) {
      toggleAside();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMediumScreenOrLower]);

  const memoToggleButton = useMemo(() => {
    return (
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleAside}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
    );
  }, [toggleAside]);

  const menu = useMemo(() => {
    return <List component="nav">{children}</List>;
  }, [children]);

  return (
    <DrawerStyled variant="permanent" open={isAsideOpen}>
      {memoToggleButton}
      <Divider />
      {menu}
    </DrawerStyled>
  );
};
export default AsideDrawer;
