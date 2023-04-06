import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { FormGridContainer, FormGridFields, FormGridItem } from '@/components/form';
import pickBy from 'lodash/pickBy';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TFormData } from './_types';
import { defaultValues } from './constants';
import fields from './fields';
export default function FormByConfig() {
  const { t } = useTranslation();
  const form = useForm<TFormData>({ defaultValues: defaultValues as any });
  const onSubmit = (formData: TFormData) => {
    console.log(pickBy(formData));
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
