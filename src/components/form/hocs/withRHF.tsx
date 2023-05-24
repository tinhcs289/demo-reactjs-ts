import usePrevious from '@/hooks/usePrevious';
import type { AnyObject, GenericFormProps } from '@/types';
import isEqual from 'lodash/isEqual';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
export default function withHookForm<FormValues extends AnyObject>(
  WrappedComponent: ComponentType<GenericFormProps<FormValues>>
): ComponentType<GenericFormProps<FormValues>> {
  return function FormWithRHF(props: GenericFormProps<FormValues>) {
    const { defaultValues, ...otherProps } = props;
    const preDefaultValues = usePrevious(defaultValues);
    const form = useForm<FormValues>({ defaultValues: defaultValues as any });
    useEffect(() => {
      if (isEqual(defaultValues, preDefaultValues)) return;
      const currentValues = form.getValues();
      form.reset({ ...defaultValues, ...currentValues });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues]);
    return (
      <FormProvider {...form}>
        <WrappedComponent {...otherProps} />
      </FormProvider>
    );
  };
}
