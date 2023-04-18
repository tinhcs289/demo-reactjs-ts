import { ButtonSubmit } from '@/components/buttons';
import { FormGridContainer, FormGridItem } from '@/components/form';
import type { SxProps, Theme } from '@mui/material';
import type { ComponentType } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FormProps, FormValues } from '../_types';
const itemSx: SxProps<Theme> = { p: 1, mb: 2 };
export default function withHookForm(WrappedComponent: ComponentType<FormProps>) {
  return function FormLoginWithHookForm(props: FormProps) {
    const { onSubmitFormLogin, loading, sx, ...otherProps } = props;
    const { t } = useTranslation();
    const form = useForm<FormValues>({
      defaultValues: {
        Account: '',
        Password: '',
        RememberMe: false,
      },
    });
    const handleSubmit = form.handleSubmit((values) => {
      onSubmitFormLogin?.(values);
    });
    return (
      <FormProvider {...form}>
        <FormGridContainer sx={sx} onSubmit={handleSubmit} loading={loading}>
          <WrappedComponent {...otherProps} loading={loading} />
          <FormGridItem sx={itemSx}>
            <ButtonSubmit id="login-form:button:submit" fullWidth>
              {t('login:login')}
            </ButtonSubmit>
          </FormGridItem>
        </FormGridContainer>
      </FormProvider>
    );
  };
}
