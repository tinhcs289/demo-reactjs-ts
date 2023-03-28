import authentication from '@/appCookies/authentication';
import PATHS from '@/constants/paths';
import LandingBanner from '@/layouts/LandingLayout/LandingBanner';
import LandingBannerSubTitle from '@/layouts/LandingLayout/LandingBannerSubTitle';
import LandingBannerTitle from '@/layouts/LandingLayout/LandingBannerTitle';
import LandingContent from '@/layouts/LandingLayout/LandingContent';
import LandingTopBar from '@/layouts/LandingLayout/LandingTopBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
export default function NotFoundPage() {
  const { t } = useTranslation();
  const accessToken = authentication.get()?.accessToken;
  return (
    <>
      <LandingTopBar>{t('notFound:pageNotFound')}</LandingTopBar>
      <main>
        <LandingBanner>
          <LandingBannerTitle>{`404`}</LandingBannerTitle>
          <LandingBannerSubTitle>{t('notFound:theContentDoesnotExist')}</LandingBannerSubTitle>
        </LandingBanner>
        <LandingContent sx={{ textAlign: 'center' }}>
          {!accessToken ? (
            <NavLink to={PATHS.login} style={{ textDecoration: 'none' }}>
              <Button startIcon={<LoginIcon />} variant="contained">
                {t('notFound:backToSignin')}
              </Button>
            </NavLink>
          ) : (
            <NavLink to={PATHS.dashboard} style={{ textDecoration: 'none' }}>
              <Button startIcon={<ArrowBackIcon />} variant="contained">
                {t('notFound:backToDashboard')}
              </Button>
            </NavLink>
          )}
        </LandingContent>
      </main>
    </>
  );
}
