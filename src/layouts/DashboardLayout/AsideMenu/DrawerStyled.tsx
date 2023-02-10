import { ASIDE_MENU_WIDTH } from '@/layouts/DashboardLayout/constants';
import MuiDrawer from '@mui/material/Drawer';
import type { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import type { ComponentType } from 'react';

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
        width: 0,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
      // '& div.MuiListItemIcon-root': {
      //   minWidth: theme.spacing(4),
      // },
    },
  })
) as ComponentType<DrawerProps>;
export default DrawerStyled;
