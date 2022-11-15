import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const PageLoadingFallback: React.FC<any> = (props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: theme.palette.background.paper,
        position: 'relative',
      }}
    >
      <CircularProgress
        color="primary"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      />
    </Box>
  );
};
export default PageLoadingFallback;
