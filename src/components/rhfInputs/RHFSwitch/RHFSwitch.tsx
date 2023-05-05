import CommonSwitchField from '@/components/inputs/CommonSwitchField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFSwitchProps } from './_types';
export default function RHFSwitch(props: RHFSwitchProps) {
  const { name, control, rules, defaultValue, shouldUnregister, label, inputProps, ...otherProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onBlur, onChange, value, name, ref }, fieldState: { invalid, error } }) => (
      <CommonSwitchField
        label={label}
        name={name}
        value={value}
        checked={value === true}
        {...(!!defaultValue ? { defaultValue } : {})}
        onChange={onChange}
        inputProps={{ inputRef: ref, onBlur, ...inputProps }}
        error={invalid}
        {...(!!rules?.required ? { required: true } : {})}
        {...(!!error?.message ? { errorText: error?.message } : {})}
        {...otherProps}
      />
    ),
    [rules?.required, inputProps, defaultValue, label, otherProps]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
