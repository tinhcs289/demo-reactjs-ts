import { ButtonSubmit } from '@/components/buttons';
import { FormGridContainer, FormGridItem } from '@/components/form';
import type { SxProps, Theme } from '@mui/material';
import type { ComponentType } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FormProps, FormValues } from '../_types';
const itemSx: SxProps<Theme> = { p: 1, mb: 2 };
export default function withHookForm(WrappedComponent: ComponentType<FormProps>) {
  return function FormRegisterWithHookForm(props: FormProps) {
    const { onSubmit, loading, sx, ...otherProps } = props;
    const { t } = useTranslation();
    const form = useForm<FormValues>({
      defaultValues: {
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        PasswordReEntered: '',
        IAcceptWithTermAndCondition: false,
      },
    });
    const handleSubmit = form.handleSubmit((values) => {
      console.log(values);
      onSubmit?.(values);
    });
    return (
      <FormProvider {...form}>
        <FormGridContainer sx={sx} onSubmit={handleSubmit} loading={loading}>
          <WrappedComponent {...otherProps} loading={loading} />
          <FormGridItem sx={itemSx}>
            <ButtonSubmit fullWidth>{t('register:register')}</ButtonSubmit>
          </FormGridItem>
        </FormGridContainer>
      </FormProvider>
    );
  };
}
