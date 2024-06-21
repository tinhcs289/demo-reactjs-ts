import usePrevious from '@/hooks/usePrevious';
import type { AnyObject, CommonFormProps } from '@/types';
import isEqual from 'lodash/isEqual';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
export default function withRHF<FormValues extends AnyObject = AnyObject>(
  formOptions?: Parameters<typeof useForm<FormValues>>[0]
) {
  return function withRHFHoc<FormValues extends AnyObject = AnyObject>(
    WrappedComponent: ComponentType<CommonFormProps<FormValues>>
  ) {
    return function FormWithRHF(props: CommonFormProps<FormValues>) {
      const { defaultValues, values, ...otherProps } = props;
      const preValues = usePrevious(values);
      const preDefaultValues = usePrevious(defaultValues);
      const form = useForm<FormValues>({ ...(formOptions as any), defaultValues: defaultValues as any });
      useEffect(
        function initializeValues() {
          setTimeout(() => {
            if (isEqual(defaultValues, preDefaultValues)) return;
            const currentValues = form.getValues();
            if (isEqual(defaultValues, currentValues)) return;
            const newValues = { ...defaultValues, ...currentValues };
            form.reset(newValues);
          }, 0);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [defaultValues]
      );
      useEffect(
        function controlValues() {
          setTimeout(() => {
            if (isEqual(values, preValues)) return;
            const currentValues = form.getValues();
            if (isEqual(values, currentValues)) return;
            const newValues = { ...currentValues, ...values };
            form.reset(newValues);
          }, 0);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [values]
      );
      return (
        <FormProvider {...form}>
          <WrappedComponent {...(otherProps as any)} />
        </FormProvider>
      );
    };
  };
}
