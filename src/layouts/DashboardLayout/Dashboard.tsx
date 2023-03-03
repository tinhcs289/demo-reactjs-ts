import withHOCs from '@/hocs/withHocs';
import Toolbar from '@mui/material/Toolbar';
import type { ComponentType } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import AsideMenu from './AsideMenu';
import BoxMain from './BoxMain';
import BoxRoot from './BoxRoot';
import BoxContent from './BoxContent';
import PageWidthChange from './PageWidthChange';
import withAuthChangeWarning from './withAuthChangeWarning';
import type { TDashboardProps } from './_types';

const Dashboard: ComponentType<TDashboardProps> = withHOCs(withAuthChangeWarning)(() => {
  return (
    <BoxRoot>
      <AppBar />
      <AsideMenu />
      <BoxMain component="main">
        <Toolbar />
        <BoxContent>
          <Outlet />
        </BoxContent>
        <PageWidthChange />
      </BoxMain>
    </BoxRoot>
  );
});
export default Dashboard;
