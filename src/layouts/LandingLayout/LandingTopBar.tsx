import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
export default function LandingTopBar(props: { children?: React.ReactNode }) {
  const { children } = props;
  return (
    <AppBar position="relative">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
