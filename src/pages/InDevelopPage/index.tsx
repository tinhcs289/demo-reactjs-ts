import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PATHS from '@/routes/paths';

const InDevelopPage: React.FC<any> = (props) => {
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
      <RouterLink to={PATHS.dashboard}>
        <Button color="primary" variant="contained">{`Quay về trang chủ`}</Button>
      </RouterLink>
    </Box>
  );
};
export default InDevelopPage;
