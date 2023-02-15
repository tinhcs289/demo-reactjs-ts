import { CommonNumberFieldDebounced } from '@/components/inputs/CommonNumberField';
import type { ComponentType } from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFNumberProps } from './_types';

const RHFNumber: ComponentType<TRHFNumberProps> = (props) => {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;

  return (
    <Controller
      name={name || ''}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
      render={({
        field: { onBlur, onChange, value, name, ref },
        fieldState: {
          invalid,
          // isTouched,
          // isDirty,
          error,
        },
      }) => (
        <CommonNumberFieldDebounced
          name={name}
          value={value}
          {...(!!defaultValue ? { defaultValue } : {})}
          onValueChange={({ floatValue }) => {
            onChange(floatValue);
          }}
          onBlur={onBlur}
          inputRef={ref}
          error={invalid}
          {...(!!rules?.required
            ? {
                required: true,
              }
            : {})}
          {...(!!error?.message
            ? {
                errorText: error?.message,
              }
            : {})}
          {...inputProps}
        />
      )}
    />
  );
};
export default RHFNumber;
