import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import LandingBanner from './LandingBanner';
import LandingContent from './LandingContent';
import LandingFooter from './LandingFooter';

const LandingLayout: React.FC<{ children?: React.ReactNode; pageTitle?: React.ReactNode }> = (props) => {
  const { pageTitle, children } = props;

  const memoTopBar = React.useMemo(() => {
    return (
      <AppBar position="relative">
        <Toolbar>{pageTitle}</Toolbar>
      </AppBar>
    );
  }, [pageTitle]);

  return (
    <>
      {memoTopBar}
      <main>
        <LandingBanner
          heading={
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Album layout
            </Typography>
          }
          subHeading={
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc. Make it short and
              sweet, but not too short so folks don&apos;t simply skip over it entirely.
            </Typography>
          }
        />
        <LandingContent>{children}</LandingContent>
      </main>
      <LandingFooter
        heading={
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
        }
        subHeading={
          <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
        }
      />
    </>
  );
};
export default LandingLayout;
