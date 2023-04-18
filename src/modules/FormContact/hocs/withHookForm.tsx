import { ButtonCancel, ButtonSubmit } from '@/components/buttons';
import { FormGridContainer, FormGridItem } from '@/components/form';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FormProps, FormComponent, FormValues } from '../_types';
export default function withHookForm(WrappedComponent: FormComponent): FormComponent {
  return function FormContactWithHookForm(props: FormProps) {
    const { defaultValues, loading, resetOnClose, onClose, onSubmit, subForm, ...otherProps } = props;
    const { t } = useTranslation();
    const form = useForm<FormValues>({ defaultValues });
    const handleSubmit = useMemo(
      () =>
        form.handleSubmit(function (formData) {
          console.log(formData);
          if (typeof onSubmit === 'function') {
            onSubmit(formData);
            return;
          }
        }),
      [form, onSubmit]
    );
    const closeForm = useMemo(() => {
      if (resetOnClose) {
        form.reset(defaultValues);
        form.clearErrors();
      }
      if (typeof onClose !== 'function') return;
      onClose({ shouldReloadAfterClosed: false });
    }, [form, onClose, resetOnClose, defaultValues]);
    return (
      <FormProvider {...form}>
        <FormGridContainer onSubmit={handleSubmit} loading={loading}>
          <WrappedComponent {...otherProps} />
          {!subForm ? (
            <FormGridItem contentProps={{ display: 'flex', justifyContent: 'space-between' }} sx={{ p: 1 }}>
              <ButtonCancel onClick={closeForm as any}>{t('common:close')}</ButtonCancel>
              <ButtonSubmit id="demo-form:button:submit">{t('common:submit')}</ButtonSubmit>
            </FormGridItem>
          ) : null}
        </FormGridContainer>
      </FormProvider>
    );
  };
}
