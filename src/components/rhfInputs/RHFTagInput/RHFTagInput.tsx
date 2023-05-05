import CommonTagInputField from '@/components/inputs/CommonTagInputField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFTagInputProps } from './_types';
export default function RHFTagInput(props: RHFTagInputProps) {
  const { name, control, rules, defaultValue, shouldUnregister, label, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onBlur, onChange, value, name }, fieldState: { invalid, error } }) => (
      <CommonTagInputField
        label={label}
        name={name}
        value={value}
        onChange={(tags) => {
          onChange(tags);
        }}
        onBlur={onBlur}
        error={invalid}
        {...(!!rules?.required ? { required: true } : {})}
        {...(!!error?.message ? { errorText: error?.message } : {})}
        {...inputProps}
      />
    ),
    [rules?.required, inputProps, label]
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
