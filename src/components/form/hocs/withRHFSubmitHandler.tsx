import { FormGridContainer } from '@/components/form';
import type { AnyObject, GenericFormProps } from '@/types';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
export default function withRHFSubmitHandler<FormValues extends AnyObject>(
  WrappedComponent: ComponentType<GenericFormProps<FormValues>>
): ComponentType<GenericFormProps<FormValues>> {
  return function FormWithRHFSubmitHandler(props: GenericFormProps<FormValues>) {
    const { onSubmit, loading, ...otherProps } = props;
    const form = useFormContext<FormValues>();
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
      <FormGridContainer onSubmit={handleSubmit} loading={loading}>
        <WrappedComponent {...otherProps} />
      </FormGridContainer>
    );
  };
}
