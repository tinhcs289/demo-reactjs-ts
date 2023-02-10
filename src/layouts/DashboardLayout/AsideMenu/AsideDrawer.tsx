import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import type { SxProps, Theme } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import AsideToggleButton from './AsideToggleButton';
import DrawerStyled from './DrawerStyled';

const toolbarSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  px: [1],
};

const AsideDrawer: FC<{ children?: ReactNode }> = (props) => {
  const { children } = props;
  const [isAsideOpen] = useDashboardLayout((s) => s.isAsideOpen);
  const open = useMemo(() => !!isAsideOpen, [isAsideOpen]);
  const menu = useMemo(() => {
    return <List component="nav">{children}</List>;
  }, [children]);
  return (
    <DrawerStyled variant="permanent" open={open}>
      <Toolbar sx={toolbarSx}>
        <AsideToggleButton />
      </Toolbar>
      <Divider />
      {menu}
    </DrawerStyled>
  );
};
export default AsideDrawer;
