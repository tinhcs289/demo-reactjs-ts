import { CommonTextNumericFieldDebounced } from '@/components/inputs/CommonTextNumericField';
import React from 'react';
import { Controller } from 'react-hook-form';
import { RHFTextNumericProps } from './_types';

const RHFNumber: React.FC<RHFTextNumericProps> = (props) => {
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
          isTouched,
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
          error={invalid && isTouched}
          {...(!!rules?.required
            ? {
                required: true,
              }
            : {})}
          {...(!!error?.message
            ? {
                helperText: error?.message,
              }
            : {})}
          {...inputProps}
        />
      )}
    />
  );
};
export default RHFNumber;
