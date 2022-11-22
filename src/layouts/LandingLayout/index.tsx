import React from 'react';
import { Outlet } from 'react-router-dom';

const LandingLayout: React.FC<{ children?: React.ReactNode }> = (props) => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default LandingLayout;
