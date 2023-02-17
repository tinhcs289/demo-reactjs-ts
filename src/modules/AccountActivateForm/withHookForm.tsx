import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import FormGridContainer from '@/components/form/FormGridContainer';
import FormGridItem from '@/components/form/FormGridItem';
import { accoutNeedToBeActivatedSelector } from '@/redux/userAccount';
import { isEqual } from 'lodash';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { defaultValues } from './constants';
import type { FormType, FormValue } from './_types';
export default function withHookForm(WrappedComponent: FormType): FormType {
  return function (props) {
    const { loading, onSubmit, ...otherProps } = props;
    const form = useForm<FormValue>({ defaultValues });
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
            <FormSubmitButton>{'Kích hoạt'}</FormSubmitButton>
          </FormGridItem>
        </FormGridContainer>
      </FormProvider>
    );
  };
}
