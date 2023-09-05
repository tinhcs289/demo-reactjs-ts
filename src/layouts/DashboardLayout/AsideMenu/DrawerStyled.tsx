import { APP_BAR_HEIGHT, ASIDE_MENU_WIDTH } from '@/layouts/DashboardLayout/constants';
import type { DrawerProps } from '@mui/material/Drawer';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import type { ComponentType } from 'react';
const DrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    ...(!open
      ? {
          zIndex: theme.zIndex.modal + 2,
        }
      : {}),
    '& .MuiDrawer-paper': {
      //background: ASIDE_COLOR.BACKGROUND,
      position: 'relative',
      whiteSpace: 'nowrap',
      //@ts-ignore
      width: ASIDE_MENU_WIDTH,
      //@ts-ignore
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open
        ? {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: 0,
            [theme.breakpoints.up('sm')]: {
              width: theme.spacing(7),
            },
          }
        : {}),
      // '& div.MuiListItemIcon-root': {
      //   minWidth: theme.spacing(4),
      // },
    },
    '& .MuiToolbar-root': {
      height: `${APP_BAR_HEIGHT}px !important`,
      minHeight: `${APP_BAR_HEIGHT}px !important`,
    },
  })
) as ComponentType<DrawerProps>;
export default DrawerStyled;
