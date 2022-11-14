import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

const LandingFooter: React.FC<
  {
    heading?: React.ReactNode;
    subHeading?: React.ReactNode;
    children?: React.ReactNode;
  } & BoxProps
> = (props) => {
  const { heading, subHeading, children } = props;

  const memoHeading = React.useMemo(() => {
    if (!heading) return null;

    if (typeof heading === 'string')
      return (
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          {heading}
        </Typography>
      );

    return <>{heading}</>;
  }, [heading]);

  const memoSubHeading = React.useMemo(() => {
    if (!subHeading) return null;

    if (typeof subHeading === 'string')
      return (
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {subHeading}
        </Typography>
      );

    return <>{subHeading}</>;
  }, [subHeading]);

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      {memoHeading}
      {memoSubHeading}
      {children}
    </Box>
  );
};
export default LandingFooter;
