import CommonTagInputField from '@/components/inputs/CommonTagInputField';
import React from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFTagInputProps } from './_types';

const RHFTagInput: React.FC<TRHFTagInputProps> = (props) => {
  const { name, control, rules, defaultValue, shouldUnregister, label, ...inputProps } = props;

  return (
    <Controller
      name={name}
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
        <CommonTagInputField
          label={label}
          name={name}
          value={value}
          onChange={(tags) => {
            onChange(tags);
          }}
          onBlur={onBlur}
          // ref={ref}
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
export default RHFTagInput;
