import LandingBanner from '@/layouts/LandingLayout/LandingBanner';
import LandingContent from '@/layouts/LandingLayout/LandingContent';
import LandingFooter from '@/layouts/LandingLayout/LandingFooter';
import LandingTopBar from '@/layouts/LandingLayout/LandingTopBar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC<any> = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <LandingTopBar>{t('notFound:pageNotFound')}</LandingTopBar>
      <main>
        <LandingBanner
          heading={
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              {`404`}
            </Typography>
          }
          subHeading={
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {t('notFound:theContentDoesnotExist')}
            </Typography>
          }
        />
        <LandingContent></LandingContent>
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
export default NotFoundPage;
