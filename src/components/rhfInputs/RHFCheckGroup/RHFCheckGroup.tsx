import CommonCheckGroupField from '@/components/inputs/CommonCheckGroupField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFCheckGroupProps } from './_types';
export default function RHFCheckGroup(props: RHFCheckGroupProps) {
  const { name, control, rules, defaultValue, shouldUnregister, label, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onBlur, onChange, value, name }, fieldState: { invalid, error } }) => (
      <CommonCheckGroupField
        label={label}
        name={name}
        value={value}
        {...(!!defaultValue ? { defaultValue } : {})}
        onChange={onChange}
        onBlur={onBlur}
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
    ),
    [rules?.required, inputProps, defaultValue, label]
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
