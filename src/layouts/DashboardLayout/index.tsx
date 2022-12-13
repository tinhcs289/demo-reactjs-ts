import withHOCs from '@/hocs/withHocs';
import DashboardLayoutProvider, { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
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
import PageWidthChange from './PageWidthChange';
import withAuthChangeWarning from './withAuthChangeWarning';
import type { TDashboardProps } from './_types';
import { DEFAULT_WIDTH } from './constants';

const Dashboard: FC<TDashboardProps> = withHOCs(withAuthChangeWarning)((props) => {
  const theme = useTheme();

  const [pageMaxWidth] = useDashboardLayout((s) => s.pageMaxWidth);

  const memoBoxSx: SxProps<Theme> = useMemo(() => {
    return {
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      position: 'relative',
    };
  }, [theme]);

  const memoContainerSx: SxProps<Theme> = useMemo(() => {
    return {
      my: theme.spacing(2),
      height: `calc(100% - ${theme.spacing(8 + 4)})`, // 8 = height of Appbar, 4 = 2 * my(2)
    };
  }, [theme]);

  const page = useMemo(() => {
    return (
      <Container maxWidth={pageMaxWidth || DEFAULT_WIDTH} sx={memoContainerSx}>
        <Outlet />
      </Container>
    );
  }, [memoContainerSx, pageMaxWidth]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      <AsideMenu />
      <Box component="main" sx={memoBoxSx}>
        <Toolbar />
        {page}
        <PageWidthChange />
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
