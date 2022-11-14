import DashboardLayoutProvider, { useDashboardLayoutContext } from '@/providers/DashboardLayoutProvider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useMemo } from 'react';
import AppBarStyled from './AppBarStyled';
import DrawerStyled from './DrawerStyled';
import { mainListItems, secondaryListItems } from './listItems';

const Dashboard: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;
  const theme = useTheme();
  const { layoutAction, layoutState } = useDashboardLayoutContext();

  const isAsideOpen = useMemo(() => {
    return !!layoutState?.isAsideOpen;
  }, [layoutState?.isAsideOpen]);

  const toggleAside = useCallback(() => {
    if (!layoutAction?.toggleAside) {
    }
    layoutAction?.toggleAside?.();
  }, [layoutAction]);

  const asideMenu = useMemo(() => {
    return (
      <DrawerStyled variant="permanent" open={isAsideOpen}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleAside}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </DrawerStyled>
    );
  }, [toggleAside, isAsideOpen]);

  const appBar = useMemo(() => {
    return (
      <AppBarStyled position="absolute" open={isAsideOpen}>
        <Toolbar sx={{ pr: theme.spacing(3) }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleAside}
            sx={{
              marginRight: theme.spacing(4.5),
              ...(isAsideOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBarStyled>
    );
  }, [theme, toggleAside, isAsideOpen]);

  const pageContent = useMemo(() => {
    return (
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </Box>
    );
  }, [theme, children]);

  return (
    <Box sx={{ display: 'flex' }}>
      {appBar}
      {asideMenu}
      {pageContent}
    </Box>
  );
};

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;

  return (
    <DashboardLayoutProvider>
      <Dashboard>{children}</Dashboard>
    </DashboardLayoutProvider>
  );
};

export default DashboardLayout;
