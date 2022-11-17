import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import snackbarNotify from '@/redux/snackbar/actions/snackbarNotify';
import { useDispatch } from 'react-redux';
import newGuid from '@/helpers/stringHelpers/newGuid';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import randomStringFromArray from '@/helpers/stringHelpers/randomStringFromArray';

const DashboardPage: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const { showInfoNotify } = useSnackbarNotify();

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
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          dispatch(snackbarNotify({ content: newGuid(), variant: 'info' }));
        }}
        sx={{
          mr: 8,
        }}
      >
        dùng redux
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          showInfoNotify(newGuid(), {
            anchorOrigin: {
              horizontal: randomStringFromArray(['left', 'right', 'center']) as 'left' | 'right' | 'center',
              vertical: randomStringFromArray(['bottom', 'top']) as 'bottom' | 'top',
            },
          });
        }}
      >
        dùng context
      </Button>
    </Box>
  );
};
export default DashboardPage;
