import authentication from '@/appCookies/authentication';
import { ButtonLink } from '@/components/buttons';
import { GridContainer, GridItem } from '@/components/grid';
import CommonImage from '@/components/media/CommonImage';
import { CommonTypography, H4 } from '@/components/typo';
import images from '@/constants/images';
import PATHS from '@/constants/paths';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
export default function Content404() {
  const { t } = useTranslation();
  const accessToken = authentication.get()?.accessToken;
  return (
    <GridContainer sx={{ p: 2 }}>
      <GridItem sx={{ my: 4 }} contentProps={{ justifyContent: 'center' }}>
        <H4>{`404`}</H4>
      </GridItem>
      <GridItem contentProps={{ justifyContent: 'center' }} sx={{ mb: 2 }}>
        <CommonTypography color="GrayText">{t('notFound:theContentDoesnotExist')}</CommonTypography>
      </GridItem>
      <GridItem contentProps={{ justifyContent: 'center' }}>
        {!accessToken ? (
          <ButtonLink to={PATHS.login} startIcon={<LoginIcon />} variant="contained">
            {t('notFound:backToSignin')}
          </ButtonLink>
        ) : (
          <ButtonLink to={PATHS.dashboard} startIcon={<ArrowBackIcon />} variant="contained">
            {t('notFound:backToDashboard')}
          </ButtonLink>
        )}
      </GridItem>
      <GridItem
        contentProps={{ justifyContent: 'center' }}
        sx={{ pt: 10, '& svg': { maxHeight: '400px', maxWidth: '100%' } }}
      >
        <CommonImage src={images.notFoundModules} height={400} />
      </GridItem>
    </GridContainer>
  );
}
