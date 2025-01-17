import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import React from 'react';
import LandingBannerSubTitle from './LandingBannerSubTitle';
import LandingBannerTitle from './LandingBannerTitle';
export type LandingFooterProps = BoxProps & {
  heading?: React.ReactNode;
  subHeading?: React.ReactNode;
  children?: React.ReactNode;
};
export default function LandingFooter(props: LandingFooterProps) {
  const { heading, subHeading, children } = props;
  const memoHeading = React.useMemo(() => {
    if (!heading) return null;
    return <LandingBannerTitle>{heading}</LandingBannerTitle>;
  }, [heading]);
  const memoSubHeading = React.useMemo(() => {
    if (!subHeading) return null;
    return <LandingBannerSubTitle>{subHeading}</LandingBannerSubTitle>;
  }, [subHeading]);
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      {memoHeading}
      {memoSubHeading}
      {children}
    </Box>
  );
}
