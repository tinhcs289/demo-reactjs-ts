import { ButtonSubmit } from '@/components/buttons';
import { FormGridContainer, FormGridItem } from '@/components/form';
import { accoutNeedToBeActivatedSelector } from '@/redux/userAccount';
import { isEqual } from 'lodash';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { FormComponent, FormValues } from '../_types';
import { defaultValues } from '../constants';
export default function withHookForm(WrappedComponent: FormComponent): FormComponent {
  return function (props) {
    const { loading, onSubmit, ...otherProps } = props;
    const form = useForm<FormValues>({ defaultValues });
    const accoutNeedToBeActivated = useSelector(accoutNeedToBeActivatedSelector);
    const handleSubmit = useMemo(
      () =>
        form.handleSubmit(function (formData) {
          onSubmit?.(formData);
        }),
      [form, onSubmit]
    );
    useEffect(() => {
      const values = form.getValues();
      if (isEqual(values?.username, accoutNeedToBeActivated)) return;
      form.setValue('username', accoutNeedToBeActivated || '');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accoutNeedToBeActivated]);
    return (
      <FormProvider {...form}>
        <FormGridContainer onSubmit={handleSubmit} loading={loading}>
          <WrappedComponent {...otherProps} />
          <FormGridItem sx={{ p: 1 }} contentProps={{ textAlign: 'center' }}>
            <ButtonSubmit>{'Kích hoạt'}</ButtonSubmit>
          </FormGridItem>
        </FormGridContainer>
      </FormProvider>
    );
  };
}
