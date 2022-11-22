import type { SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';
import { SIDE_LAYOUT_BG } from './constants';
import type { IAuthLayoutProps } from './_types';

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
  const { children, variant } = props;

  const theme = useTheme();

  const backgroundSx: SxProps<Theme> = React.useMemo(() => {
    return {
      backgroundImage: `url(${SIDE_LAYOUT_BG})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }, [theme]);

  const boxSx: SxProps<Theme> = React.useMemo(() => {
    return {
      my: theme.spacing(2),
      mx: theme.spacing(1),
      px: theme.spacing(2),
      py: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };
  }, [theme]);

  const memoChilren = React.useMemo(() => {
    return <>{children}</>;
  }, [children]);

  return (
    <>
      {React.useMemo(() => {
        if (variant === 'fullWidth')
          return (
            <Container component="main" maxWidth="xs">
              <Box sx={boxSx}>{memoChilren}</Box>
            </Container>
          );

        if (variant === 'side')
          return (
            <Grid container component="main" sx={{ height: '100vh' }}>
              <Grid item xs={false} sm={4} md={7} sx={backgroundSx} />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={boxSx}>{memoChilren}</Box>
              </Grid>
            </Grid>
          );

        return null;
      }, [memoChilren, variant, boxSx, backgroundSx])}
    </>
  );
};
export default AuthLayout;
