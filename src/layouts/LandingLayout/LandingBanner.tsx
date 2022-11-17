import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react';
import LandingBannerSubTitle from './LandingBannerSubTitle';
import LandingBannerTitle from './LandingBannerTitle';

const LandingBanner: React.FC<
  {
    heading?: React.ReactNode;
    subHeading?: React.ReactNode;
    children?: React.ReactNode;
  } & BoxProps
> = (props) => {
  const { heading, subHeading, children, ...otherProps } = props;

  const memoHeading = React.useMemo(() => {
    if (!heading) return null;

    return <LandingBannerTitle>{heading}</LandingBannerTitle>;
  }, [heading]);

  const memoSubHeading = React.useMemo(() => {
    if (!subHeading) return null;

    return <LandingBannerSubTitle>{subHeading}</LandingBannerSubTitle>;
  }, [subHeading]);

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
      {...otherProps}
    >
      <Container maxWidth="sm">
        {memoHeading}
        {memoSubHeading}
        {children}
      </Container>
    </Box>
  );
};
export default LandingBanner;
