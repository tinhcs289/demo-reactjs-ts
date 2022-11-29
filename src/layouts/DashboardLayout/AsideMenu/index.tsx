import CommonTooltip from '@/components/CommonTooltip';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import stringOrEmpty from '@/helpers/formatHelpers/stringOrEmpty';
import AsideDrawer from '@/layouts/DashboardLayout/AsideMenu/AsideDrawer';
import { TAsideMenuItem } from '@/layouts/DashboardLayout/_types';
import { useDashboardLayoutContext } from '@/providers/DashboardLayoutProvider';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import type { FC } from 'react';
import { useMemo } from 'react';
import MenuItem from './MenuItem';

const AsideMenu: FC<any> = (props) => {
  const {
    layoutState: { isAsideOpen, menuItems },
  } = useDashboardLayoutContext();

  const asideMenuItems: TAsideMenuItem[] = useMemo(() => {
    return arrayOrEmpty(menuItems);
  }, [menuItems]);

  const isChildActive = (item?: TAsideMenuItem) => {
    if (!item || !item?.url) return false;

    if (!(Array.isArray(item.childs) && item.childs.length > 0)) return false;

    if (item.childs.findIndex((c) => !!c.active) >= 0) return true;

    return false;
  };

  const menu = useMemo(() => {
    return (
      <AsideDrawer>
        {asideMenuItems?.map?.((item) => {
          const hasChilds = Array.isArray(item.childs) && item.childs.length > 0;
          if (!hasChilds) {
            return <MenuItem key={item.id} data={item} active={!!item.active} depth={0} />;
          } else {
            const childActive = isChildActive(item);
            return isAsideOpen ? (
              <MenuItem key={item.id} data={item} childActive={childActive} active={!!item.active} depth={0}>
                <Collapse in={!!item.openSubMenu} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item?.childs?.map?.((child) => {
                      return <MenuItem key={child.id} data={child} active={!!child.active} depth={1} />;
                    })}
                  </List>
                </Collapse>
              </MenuItem>
            ) : (
              <CommonTooltip
                key={item.id}
                placement="right-start"
                title={
                  <List
                    component="div"
                    disablePadding
                    subheader={<ListSubheader component="div">{item?.label || ''}</ListSubheader>}
                  >
                    {item?.childs?.map?.((child) => {
                      return <MenuItem key={child.id} data={child} active={!!child.active} depth={1} />;
                    })}
                  </List>
                }
              >
                <MenuItem key={item.id} data={item} childActive={childActive} active={!!item.active} depth={0} />
              </CommonTooltip>
            );
          }
        })}
      </AsideDrawer>
    );
  }, [asideMenuItems, isAsideOpen]);

  return menu;
};
export default AsideMenu;
