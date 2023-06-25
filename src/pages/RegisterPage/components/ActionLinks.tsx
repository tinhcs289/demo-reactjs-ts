import { ButtonNavigate } from '@/components/buttons';
import PATHS from '@/constants/paths';
import Grid from '@mui/material/Grid';
import type { GridProps } from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
export default function ActionLinks(props: GridProps) {
  const { t } = useTranslation();
  return (
    <Grid container justifyContent="flex-end" {...props}>
      <Grid item>
        <ButtonNavigate color="primary" variant="text" to={PATHS.login} noTextTransform>
          {t('register:alreadyHaveAccount_login')}
        </ButtonNavigate>
      </Grid>
    </Grid>
  );
}
