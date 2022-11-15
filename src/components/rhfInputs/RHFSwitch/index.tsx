import CommonSwitchField from '@/components/inputs/CommonSwitchField';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TRHFSwitchProps } from './types';

const RHFSwitch: React.FC<TRHFSwitchProps> = (props) => {
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
        <CommonSwitchField
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
export default RHFSwitch;
