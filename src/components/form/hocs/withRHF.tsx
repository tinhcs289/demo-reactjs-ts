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
      const { defaultValues, ...otherProps } = props;
      const preValues = usePrevious(defaultValues);
      const form = useForm<FormValues>({ ...(formOptions as any), defaultValues: defaultValues as any });
      useEffect(() => {
        if (isEqual(defaultValues, preValues)) return;
        const currentValues = form.getValues();
        form.reset({ ...defaultValues, ...currentValues });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [defaultValues]);
      return (
        <FormProvider {...form}>
          <WrappedComponent {...(otherProps as any)} />
        </FormProvider>
      );
    };
  };
}
