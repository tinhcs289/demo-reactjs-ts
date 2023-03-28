import FormGridContainer from '@/components/form/FormGridContainer';
import FormGridItem from '@/components/form/FormGridItem';
import RHFCheck from '@/components/rhfInputs/RHFCheck';
import RHFText from '@/components/rhfInputs/RHFText';
import PATHS from '@/constants/paths';
import { required } from '@/constants/rhfRules';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import type { SxProps, Theme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { defaultValues } from './constants';
import type { LoginPageProps, LoginFormData } from './_types';
const itemSx: SxProps<Theme> = { p: 1, mb: 2 };
export default function LoginPage(props: LoginPageProps) {
  const { onSubmitLoginForm, loading } = props;
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<LoginFormData>({ defaultValues });
  const onSubmit = (formData: LoginFormData) => {
    onSubmitLoginForm?.(formData);
  };
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('login:login')}
      </Typography>
      <FormGridContainer onSubmit={handleSubmit(onSubmit)} loading={loading}>
        <FormGridItem sx={itemSx}>
          <RHFText
            id="login-form:text:account"
            name="Account"
            label={t('login:account')}
            control={control}
            rules={required(t('common:pleaseEnter'))}
          />
        </FormGridItem>
        <FormGridItem sx={itemSx}>
          <RHFText
            id="login-form:text:password"
            name="Password"
            label={t('login:password')}
            type="password"
            control={control}
            rules={required(t('common:pleaseEnter'))}
          />
        </FormGridItem>
        <FormGridItem sx={itemSx}>
          <RHFCheck
            id="login-form:check:remember-me"
            control={control}
            name="RememberMe"
            label={t('login:rememberMe')}
          />
        </FormGridItem>
        <FormGridItem sx={itemSx}>
          <Button id="login-form:button:submit" type="submit" fullWidth variant="contained">
            {t('login:login')}
          </Button>
        </FormGridItem>
      </FormGridContainer>
      <Grid container>
        <Grid item xs>
          <Link id="login-form:link:forgot-password" component={RouterLink} to={PATHS.forgetPassword}>
            {t('login:forgotPassword')}
          </Link>
        </Grid>
        <Grid item>
          <Link id="login-form:link:dont-have-account-register" component={RouterLink} to={PATHS.register}>
            {t('login:dontHaveAccount_register')}
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
