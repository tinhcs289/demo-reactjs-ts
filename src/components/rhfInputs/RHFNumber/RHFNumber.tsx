import { CommonNumberFieldDebounced } from '@/components/inputs/CommonNumberField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFNumberProps } from './_types';
export default function RHFNumber(props: RHFNumberProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onBlur, onChange, value, name, ref }, fieldState: { invalid, error } }) => (
      <CommonNumberFieldDebounced
        name={name}
        value={value || null}
        {...(!!defaultValue ? { defaultValue } : {})}
        onValueChange={({ floatValue }) => {
          onChange(floatValue || null);
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
    ),
    [rules?.required, inputProps, defaultValue]
  );
  return (
    <Controller
      name={name || ''}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
