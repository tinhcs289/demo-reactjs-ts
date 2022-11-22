import PATHS from '@/routes/paths';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const DashboardPage: React.FC<any> = (props) => {
  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RouterLink to={PATHS.inDevelop}>
        <Button color="primary" variant="contained">{`aaaaaa`}</Button>
      </RouterLink>
    </Box>
  );
};
export default DashboardPage;
