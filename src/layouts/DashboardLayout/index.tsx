import DashboardLayoutProvider from '@/providers/DashboardLayoutProvider';
import type { SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import AsideMenu from './AsideMenu';

const Dashboard: React.FC<{ children?: React.ReactNode }> = (props) => {
  const theme = useTheme();

  const memoBoxSx: SxProps<Theme> = React.useMemo(() => {
    return {
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    };
  }, [theme]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      <AsideMenu />
      <Box component="main" sx={memoBoxSx}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ my: theme.spacing(2) }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = (props) => {
  return (
    <DashboardLayoutProvider>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </DashboardLayoutProvider>
  );
};

export default DashboardLayout;
