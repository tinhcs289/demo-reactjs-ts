import { useDashboardLayoutState } from '@/providers/DashboardLayoutProvider';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import AsideToggleButton from './AsideToggleButton';
import DrawerStyled from './DrawerStyled';
import ToolbarStyled from './ToolbarStyled';
export default function AsideDrawer(props: { children?: ReactNode }) {
  const { children } = props;
  const isAsideOpen = useDashboardLayoutState((s) => s.isAsideOpen);
  const open = useMemo(() => !!isAsideOpen, [isAsideOpen]);
  return (
    <DrawerStyled variant="permanent" open={open} className="db-layout-left">
      <ToolbarStyled>
        <AsideToggleButton />
      </ToolbarStyled>
      <Divider />
      <List component="nav">{children}</List>
    </DrawerStyled>
  );
}
