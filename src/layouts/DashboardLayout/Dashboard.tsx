import withHOCs from '@/hocs/withHocs';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import AsideMenu from './AsideMenu';
import BoxContent from './BoxContent';
import BoxMain from './BoxMain';
import BoxRoot from './BoxRoot';
import PageWidthChange from './PageWidthChange';
import withAuthChangeWarning from './withAuthChangeWarning';
import { MODIFIABLE_WIDTH } from '@/layouts/DashboardLayout/constants';
const Dashboard = withHOCs(withAuthChangeWarning)(function Dashboard() {
  return (
    <BoxRoot>
      <AppBar />
      <AsideMenu />
      <BoxMain {...{ component: 'main' }}>
        <Toolbar />
        <BoxContent>
          <Outlet />
        </BoxContent>
        {!MODIFIABLE_WIDTH ? null : <PageWidthChange />}
      </BoxMain>
    </BoxRoot>
  );
});
export default Dashboard;
