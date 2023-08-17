import CommonTooltip from '@/components/box/CommonTooltip';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
import { useDashboardLayoutState } from '@/providers/DashboardLayoutProvider';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import { memo, useCallback, useMemo } from 'react';
import MenuItem from './MenuItem';
function AsideMenuList() {
  const isOpen = useDashboardLayoutState((s) => s.isAsideOpen);
  const menuItems = useDashboardLayoutState((s) => s.menuItems);
  const isAsideOpen = useMemo(() => !!isOpen, [isOpen]);
  const asideMenuItems: TAsideMenuItem[] = useMemo(() => {
    return arrayOrEmpty(menuItems);
  }, [menuItems]);
  const isChildActive = useCallback((item?: TAsideMenuItem) => {
    if (!item || !item?.url) return false;
    if (!(Array.isArray(item.childs) && item.childs.length > 0)) return false;
    if (item.childs.findIndex((c) => !!c.active) >= 0) return true;
    return false;
  }, []);
  const $Menu = useMemo(() => {
    return (
      <>
        {asideMenuItems?.map?.((item) => {
          const isDivider = item?.type === 'divider';
          if (isDivider) {
            return <Divider variant="inset" component="li" key={item?.id} sx={{ ml: '0 !important' }} />;
          }
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
                <MenuItem
                  key={item.id}
                  data={item}
                  childActive={childActive}
                  active={!!item.active}
                  depth={0}
                />
              </CommonTooltip>
            );
          }
        })}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asideMenuItems, isAsideOpen]);
  return $Menu;
}
export default memo(AsideMenuList);
