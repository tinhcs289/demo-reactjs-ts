import authentication from '@/appCookies/authentication';
import { ButtonLink } from '@/components/buttons';
import PATHS from '@/constants/paths';
import LandingBanner from '@/layouts/LandingLayout/LandingBanner';
import LandingBannerSubTitle from '@/layouts/LandingLayout/LandingBannerSubTitle';
import LandingBannerTitle from '@/layouts/LandingLayout/LandingBannerTitle';
import LandingContent from '@/layouts/LandingLayout/LandingContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
export default function Content404() {
  const { t } = useTranslation();
  const accessToken = authentication.get()?.accessToken;
  return (
    <>
      <LandingBanner>
        <LandingBannerTitle>{`404`}</LandingBannerTitle>
        <LandingBannerSubTitle>{t('notFound:theContentDoesnotExist')}</LandingBannerSubTitle>
      </LandingBanner>
      <LandingContent sx={{ textAlign: 'center' }}>
        {!accessToken ? (
          <ButtonLink to={PATHS.login} startIcon={<LoginIcon />} variant="contained">
            {t('notFound:backToSignin')}
          </ButtonLink>
        ) : (
          <ButtonLink to={PATHS.dashboard} startIcon={<ArrowBackIcon />} variant="contained">
            {t('notFound:backToDashboard')}
          </ButtonLink>
        )}
      </LandingContent>
    </>
  );
}
