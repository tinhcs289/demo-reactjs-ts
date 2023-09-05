import withHOCs from '@/hocs/withHocs';
import { APP_BAR_HEIGHT, MODIFIABLE_WIDTH } from '@/layouts/DashboardLayout/constants';
import DashboardLayoutProvider from '@/providers/DashboardLayoutProvider';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import AsideMenu, { AutoToggleAsideByScreen } from './AsideMenu';
import LayoutInit from './LayoutInit';
import PageWidthChange from './PageWidthChange';
import withAuthChangeWarning from './withAuthChangeWarning';
const BoxRoot = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  overflowY: 'hidden',
}));
const BoxMain = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
  flexGrow: 1,
  height: '100vh',
  width: '100%',
  position: 'relative',
  overflowX: 'auto',
  overflowY: 'hidden',
  '& .MuiToolbar-root': {
    height: `${APP_BAR_HEIGHT}px !important`,
    minHeight: `${APP_BAR_HEIGHT}px !important`,
  },
  display: 'flex',
  flexDirection: 'column',
}));
const BoxContent = styled(Box)<BoxProps>(() => ({
  margin: 0,
  padding: 0,
  height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
  overflow: 'auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
}));
const Dashboard = withHOCs(withAuthChangeWarning)(function Dashboard() {
  return (
    <BoxRoot className="db-layout-root">
      <AppBar />
      <AsideMenu />
      <BoxMain {...{ component: 'main' }} className="db-layout-right">
        <Toolbar />
        <BoxContent className="db-page-content">
          <Outlet />
        </BoxContent>
        {!MODIFIABLE_WIDTH ? null : <PageWidthChange />}
      </BoxMain>
    </BoxRoot>
  );
});
export default function DashboardLayout() {
  return (
    <DashboardLayoutProvider>
      <Dashboard>
        <Outlet />
      </Dashboard>
      <LayoutInit />
      <AutoToggleAsideByScreen />
    </DashboardLayoutProvider>
  );
}
