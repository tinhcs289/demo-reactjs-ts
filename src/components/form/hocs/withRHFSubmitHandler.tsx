import type { AnyObject, CommonFormProps } from '@/types';
import Grid from '@mui/material/Grid';
import type { ComponentType, FormEventHandler } from 'react';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
export default function withRHFSubmitHandler<FormValues extends AnyObject = AnyObject>(
  WrappedComponent: ComponentType<CommonFormProps<FormValues>>
) {
  return function FormWithSubmitHandler(props: CommonFormProps<FormValues>) {
    const { onSubmit, ...otherProps } = props;
    const { handleSubmit } = useFormContext<FormValues>();
    const handleSubmitOverride: FormEventHandler<HTMLFormElement> = useCallback(
      (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        handleSubmit(function (formData) {
          onSubmit?.(formData);
        })(event);
      },
      [handleSubmit, onSubmit]
    );
    return (
      <Grid component="form" onSubmit={handleSubmitOverride} noValidate width={'100%'} container>
        <WrappedComponent {...otherProps} />
      </Grid>
    );
  };
}
