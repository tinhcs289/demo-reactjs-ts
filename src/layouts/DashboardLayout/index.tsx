import withHOCs from '@/hocs/withHocs';
import withAuthChangeWarning from '@/layouts/DashboardLayout/withAuthChangeWarning';
import type { TDashboardProps } from '@/layouts/DashboardLayout/_types';
import DashboardLayoutProvider from '@/providers/DashboardLayoutProvider';
import type { SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { FC, ReactNode, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import AsideMenu from './AsideMenu';
import LayoutInit from './LayoutInit';

const Dashboard: FC<TDashboardProps> = withHOCs(withAuthChangeWarning)((props) => {
  const theme = useTheme();

  const memoBoxSx: SxProps<Theme> = useMemo(() => {
    return {
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    };
  }, [theme]);

  const memoContainerSx: SxProps<Theme> = useMemo(() => {
    return { my: theme.spacing(2) };
  }, [theme]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      <AsideMenu />
      <Box component="main" sx={memoBoxSx}>
        <Toolbar />
        <Container maxWidth="lg" sx={memoContainerSx}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
});

const DashboardLayout: FC<{ children?: ReactNode }> = (props) => {
  return (
    <DashboardLayoutProvider>
      <Dashboard>
        <Outlet />
      </Dashboard>
      <LayoutInit />
    </DashboardLayoutProvider>
  );
};

export default DashboardLayout;
