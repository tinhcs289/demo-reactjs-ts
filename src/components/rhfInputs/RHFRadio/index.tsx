import CommonRadioField from '@/components/inputs/CommonRadioField';
import React from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFRadioProps } from './_types';

const RHFRadio: React.FC<TRHFRadioProps> = (props) => {
  const { name, control, rules, defaultValue, shouldUnregister, label, inputProps, ...otherProps } = props;

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
        <CommonRadioField
          label={label}
          name={name}
          value={value}
          checked={value === true}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={(_, checked) => {
            onChange(checked);
          }}
          inputProps={{ inputRef: ref, onBlur, ...inputProps }}
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
          {...otherProps}
        />
      )}
    />
  );
};
export default RHFRadio;
