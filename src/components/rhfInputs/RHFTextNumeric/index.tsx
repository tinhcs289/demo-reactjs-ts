import { CommonTextNumericFieldDebounced } from '@/components/inputs/CommonTextNumericField';
import React from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFTextNumericProps } from './_types';

const RHFTextNumeric: React.FC<TRHFTextNumericProps> = (props) => {
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
        <CommonTextNumericFieldDebounced
          name={name}
          value={value}
          {...(!!defaultValue ? { defaultValue } : {})}
          onValueChange={({ formattedValue }) => {
            onChange(formattedValue);
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
export default RHFTextNumeric;
