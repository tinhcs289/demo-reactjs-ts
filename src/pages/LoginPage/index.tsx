import RHFCheck from '@/components/rhfInputs/RHFCheck';
import RHFText from '@/components/rhfInputs/RHFText';
import { required } from '@/constants/rhfRules';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TLoginFormData, ILoginPageProps } from './_types';

const LoginPage: React.FC<ILoginPageProps> = (props) => {
  const { onSubmitLoginForm } = props;

  const theme = useTheme();

  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<TLoginFormData>({
    defaultValues: {
      Account: '',
      Password: '',
      RememberMe: false,
    },
  });

  const onSubmit = (formData: TLoginFormData) => {
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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <RHFText
          name="Account"
          label={t('login:account')}
          control={control}
          rules={required(t('common:pleaseEnter'))}
          sx={{
            mb: theme.spacing(3),
          }}
        />
        <RHFText
          name="Password"
          label={t('login:password')}
          type="password"
          control={control}
          rules={required(t('common:pleaseEnter'))}
          sx={{
            mb: theme.spacing(3),
          }}
        />
        <RHFCheck control={control} name="RememberMe" label={t('login:rememberMe')} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {t('login:login')}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {t('login:forgotPassword')}
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {t('login:dontHaveAccount_register')}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default LoginPage;