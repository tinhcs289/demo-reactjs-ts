import CommonAvatar from '@/components/media/CommonAvatar';
import { H4 } from '@/components/typo';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
export default function FormHeading() {
  const { t } = useTranslation();
  return (
    <>
      <CommonAvatar icon={LockOutlinedIcon} sx={{ m: 1, bgcolor: 'secondary.main' }} />
      <H4 maxLines={1}>{t('login:login')}</H4>
    </>
  );
}
