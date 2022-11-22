import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import React from 'react';

const LandingBannerSubTitle: React.FC<Omit<TypographyProps, 'ref'>> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Typography variant="h5" align="center" color="text.secondary" paragraph {...otherProps}>
      {children}
    </Typography>
  );
};
export default LandingBannerSubTitle;
