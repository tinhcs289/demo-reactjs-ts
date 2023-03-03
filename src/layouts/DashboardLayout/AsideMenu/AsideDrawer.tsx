import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import type { ComponentType, ReactNode } from 'react';
import { useMemo } from 'react';
import AsideToggleButton from './AsideToggleButton';
import DrawerStyled from './DrawerStyled';
import ToolbarStyled from './ToolbarStyled';

const AsideDrawer: ComponentType<{ children?: ReactNode }> = (props) => {
  const { children } = props;
  const [isAsideOpen] = useDashboardLayout((s) => s.isAsideOpen);
  const open = useMemo(() => !!isAsideOpen, [isAsideOpen]);
  const menu = useMemo(() => {
    return <List component="nav">{children}</List>;
  }, [children]);
  return (
    <DrawerStyled variant="permanent" open={open}>
      <ToolbarStyled>
        <AsideToggleButton />
      </ToolbarStyled>
      <Divider />
      {menu}
    </DrawerStyled>
  );
};
export default AsideDrawer;
