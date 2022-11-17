import LandingBanner from '@/layouts/LandingLayout/LandingBanner';
import LandingBannerSubTitle from '@/layouts/LandingLayout/LandingBannerSubTitle';
import LandingBannerTitle from '@/layouts/LandingLayout/LandingBannerTitle';
import LandingContent from '@/layouts/LandingLayout/LandingContent';
import LandingFooter from '@/layouts/LandingLayout/LandingFooter';
import LandingTopBar from '@/layouts/LandingLayout/LandingTopBar';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC<any> = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <LandingTopBar>{t('notFound:pageNotFound')}</LandingTopBar>
      <main>
        <LandingBanner>
          <LandingBannerTitle>{`404`}</LandingBannerTitle>
          <LandingBannerSubTitle>{t('notFound:theContentDoesnotExist')}</LandingBannerSubTitle>
        </LandingBanner>
        <LandingContent></LandingContent>
      </main>
      <LandingFooter>
        <LandingBannerTitle>{'Footer'}</LandingBannerTitle>
        <LandingBannerSubTitle>{'Something here to give the footer a purpose!'}</LandingBannerSubTitle>
      </LandingFooter>
    </>
  );
};
export default NotFoundPage;
