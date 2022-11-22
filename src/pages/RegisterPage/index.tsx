import RHFCheck from '@/components/rhfInputs/RHFCheck';
import RHFText from '@/components/rhfInputs/RHFText';
import { email, required } from '@/constants/rhfRules';
import PATHS from '@/routes/paths';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import type { IRegisterPageProps, TRegisterFormData } from './_types';

const RegisterPage: React.FC<IRegisterPageProps> = (props) => {
  const { onSubmitRegisterForm } = props;

  const { t } = useTranslation();

  const { control, handleSubmit, watch } = useForm<TRegisterFormData>({
    defaultValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      PasswordReEntered: '',
      IAcceptWithTermAndCondition: false,
    },
  });

  const onSubmit = (formData: TRegisterFormData) => {
    onSubmitRegisterForm?.(formData);
  };

  const watchPassword = watch('Password');

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('register:register')}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <RHFText
              name="FirstName"
              control={control}
              label={t('register:firstName')}
              rules={required(t('common:pleaseEnter'))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFText
              name="LastName"
              control={control}
              label={t('register:lastName')}
              rules={required(t('common:pleaseEnter'))}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFText
              name="Email"
              control={control}
              label={t('register:email')}
              rules={{ ...required(t('common:pleaseEnter')), ...email(t('common:invalidEmail')) }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFText
              name="Password"
              label={t('register:password')}
              type="password"
              control={control}
              rules={required(t('common:pleaseEnter'))}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFText
              name="PasswordReEntered"
              label={t('register:passwordReEnter')}
              type="password"
              control={control}
              rules={{
                ...required(t('common:pleaseEnter')),
                validate: {
                  PasswordAndPasswordReEnterdMustMatch: (val: string) =>
                    val === watchPassword || (t('register:passwordDoesntMatch') as any),
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFCheck
              name="IAcceptWithTermAndCondition"
              control={control}
              label={t('register:iAcceptWithTermAndCondition')}
              rules={required(t('common:pleaseSelect'))}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {t('register:register')}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to={PATHS.login}>
              {t('register:alreadyHaveAccount_login')}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default RegisterPage;
