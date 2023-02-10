import CommonDateMultiField from '@/components/inputs/CommonDateMultiField';
import React from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFDateMultiProps } from './_types';

const RHFDateMulti: React.FC<TRHFDateMultiProps> = (props) => {
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
        <CommonDateMultiField
          name={name}
          value={value}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={(dates) => {
            if (Array.isArray(dates) && dates.length > 0) onChange(dates);
            else onChange(undefined);
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
export default RHFDateMulti;
