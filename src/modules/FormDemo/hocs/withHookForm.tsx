import { ButtonSubmit } from '@/components/buttons';
import { FormGridContainer, FormGridItem } from '@/components/form';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FormComponent, FormProps, FormValues } from '../_types';
export default function withHookForm(WrappedComponent: FormComponent): FormComponent {
  return function FormContactWithHookForm(props: FormProps) {
    const { defaultValues, loading, resetOnClose, onClose, onSubmit, subForm, ...otherProps } = props;
    const { t } = useTranslation();
    const form = useForm<FormValues>({ defaultValues });
    const handleSubmit = useMemo(
      () =>
        form.handleSubmit(function (formData) {
          console.log(formData);
          onSubmit?.(formData);
          return;
        }),
      [form, onSubmit]
    );
    return (
      <FormProvider {...form}>
        <FormGridContainer onSubmit={handleSubmit} loading={loading}>
          <WrappedComponent {...otherProps} />
          <FormGridItem contentProps={{ display: 'flex', justifyContent: 'center' }} sx={{ p: 1 }}>
            <ButtonSubmit id="demo-form:button:submit">{t('common:submit')}</ButtonSubmit>
          </FormGridItem>
        </FormGridContainer>
      </FormProvider>
    );
  };
}
