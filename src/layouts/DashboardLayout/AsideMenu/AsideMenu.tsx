import AsideDrawer from './AsideDrawer';
import AsideMenuList from './AsideMenuList';
import { memo } from 'react';
function AsideMenu() {
  return (
    <AsideDrawer>
      <AsideMenuList />
    </AsideDrawer>
  );
}
export default memo(AsideMenu);
