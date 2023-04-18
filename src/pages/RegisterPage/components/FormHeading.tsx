import CommonAvatar from '@/components/media/CommonAvatar';
import { H4 } from '@/components/typo';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useTranslation } from 'react-i18next';
export default function FormHeading() {
  const { t } = useTranslation();
  return (
    <>
      <CommonAvatar icon={AppRegistrationIcon} sx={{ m: 1, bgcolor: 'secondary.main' }} />
      <H4 maxLines={1}>{t('register:register')}</H4>
    </>
  );
}
