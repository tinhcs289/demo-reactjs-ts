import CommonDateField from '@/components/inputs/CommonDateField';
import React from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFDateProps } from './_types';

const RHFDate: React.FC<TRHFDateProps> = (props) => {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;

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
        <CommonDateField
          name={name}
          value={value}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={onChange}
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
export default RHFDate;
