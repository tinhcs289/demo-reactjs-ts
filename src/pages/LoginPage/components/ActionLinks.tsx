import { ButtonLink } from '@/components/buttons';
import PATHS from '@/constants/paths';
import Grid from '@mui/material/Grid';
import type { GridProps } from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
export default function ActionLinks(props: GridProps) {
  const { t } = useTranslation();
  return (
    <Grid container justifyContent="space-between" {...props}>
      <Grid item>
        <ButtonLink color="primary" variant="text" to={PATHS.forgetPassword} noTextTransform>
          {t('login:forgotPassword')}
        </ButtonLink>
      </Grid>
      <Grid item>
        <ButtonLink color="primary" variant="text" to={PATHS.register} noTextTransform>
          {t('login:dontHaveAccount_register')}
        </ButtonLink>
      </Grid>
    </Grid>
  );
}
