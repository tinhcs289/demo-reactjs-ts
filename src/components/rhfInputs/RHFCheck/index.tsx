import CommonCheckField from '@/components/inputs/CommonCheckField';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TRHFCheckProps } from './types';

const RHFCheck: React.FC<TRHFCheckProps> = (props) => {
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
          isTouched,
          // isDirty,
          error,
        },
      }) => (
        <CommonCheckField
          label={label}
          name={name}
          value={value}
          checked={value === true}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={onChange}
          inputProps={{ inputRef: ref, onBlur, ...inputProps }}
          error={invalid && isTouched}
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
        />
      )}
    />
  );
};
export default RHFCheck;
