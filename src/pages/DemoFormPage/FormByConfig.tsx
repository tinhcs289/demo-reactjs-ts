import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import FormGridContainer from '@/components/form/FormGridContainer';
import FormGridFields from '@/components/form/FormGridFields';
import FormGridItem from '@/components/form/FormGridItem';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { defaultValues } from './constants';
import fields from './fields';
import type { TFormData } from './_types';

export default function FormByConfig() {
  const { t } = useTranslation();

  const form = useForm<TFormData>({ defaultValues: defaultValues as any });

  const onSubmit = (formData: TFormData) => {
    console.log(formData);
  };

  return (
    <FormProvider {...form}>
      <FormGridContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormGridFields fields={fields} />
        <FormGridItem justifyContent="center" contentProps={{ md: 2 }} sx={{ p: 1 }}>
          <FormSubmitButton id="demo-form:button:submit">{t('common:submit')}</FormSubmitButton>
        </FormGridItem>
      </FormGridContainer>
    </FormProvider>
  );
}
