import FormCloseButton from '@/components/buttons/FormCloseButton';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import FormGridContainer from '@/components/form/FormGridContainer';
import FormGridItem from '@/components/form/FormGridItem';
import type { TBaseFormProps } from '@/types';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormType<T extends { [x: string]: any }> = ComponentType<TBaseFormProps<T>>;

export default function withHookForm<T extends { [x: string]: any }>(
  WrappedComponent: FormType<T>
): FormType<T> {
  return function (props) {
    const { defaultValues, loading, resetOnClose, onClose, onSubmit, subForm, ...otherProps } = props;

    const { t } = useTranslation();

    const form = useForm<T>({ defaultValues: defaultValues as any });

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
      onClose({ reload: false });
    }, [form, onClose, resetOnClose, defaultValues]);

    return (
      <FormProvider {...form}>
        <FormGridContainer onSubmit={handleSubmit} loading={loading}>
          <WrappedComponent {...otherProps} />
          {!subForm ? (
            <FormGridItem contentProps={{ display: 'flex', justifyContent: 'space-between' }} sx={{ p: 1 }}>
              <FormCloseButton onClick={closeForm as any}>{t('common:close')}</FormCloseButton>
              <FormSubmitButton id="demo-form:button:submit">{t('common:submit')}</FormSubmitButton>
            </FormGridItem>
          ) : null}
        </FormGridContainer>
      </FormProvider>
    );
  };
}
