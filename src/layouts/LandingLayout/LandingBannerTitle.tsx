import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

const LandingBannerTitle: React.FC<Omit<TypographyProps, 'ref'>> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom {...otherProps}>
      {children}
    </Typography>
  );
};
export default LandingBannerTitle;
