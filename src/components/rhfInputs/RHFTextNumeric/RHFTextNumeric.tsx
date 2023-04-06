import { CommonTextNumericFieldDebounced } from '@/components/inputs/CommonTextNumericField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFTextNumericProps } from './_types';
export default function RHFTextNumeric(props: RHFTextNumericProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onBlur, onChange, value, name, ref }, fieldState: { invalid, error } }) => (
      <CommonTextNumericFieldDebounced
        name={name}
        value={value}
        {...(!!defaultValue ? { defaultValue } : {})}
        onValueChange={({ formattedValue }) => {
          onChange(formattedValue);
        }}
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        {...(!!rules?.required ? { required: true } : {})}
        {...(!!error?.message ? { errorText: error?.message } : {})}
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
