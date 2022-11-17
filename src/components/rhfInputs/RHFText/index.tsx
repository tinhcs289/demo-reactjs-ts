import CommonTextField from '@/components/inputs/CommonTextField';
import { TRHFTextProps } from './_types';
import React from 'react';
import { Controller } from 'react-hook-form';

const RHFText: React.FC<TRHFTextProps> = (props) => {
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
          isTouched,
          // isDirty,
          error,
        },
      }) => (
        <CommonTextField
          name={name}
          value={value}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={onChange}
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
export default RHFText;
