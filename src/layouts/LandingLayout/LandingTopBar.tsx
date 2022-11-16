import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

const LandingTopBar: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;

  return (
    <AppBar position="relative">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
};
export default LandingTopBar;
