import CommonDateTimeField from '@/components/inputs/CommonDateTimeField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFDateTimeProps } from './_types';
export default function RHFDateTime(props: RHFDateTimeProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => (
      <CommonDateTimeField
        value={value || null}
        defaultValue={defaultValue || value || null}
        onChange={onChange as any}
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
      name={name}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
