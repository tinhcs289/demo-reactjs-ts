import CommonTextField from '@/components/inputs/CommonTextField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFTextProps } from './_types';
export default function RHFText(props: RHFTextProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onBlur, onChange, value, name, ref }, fieldState: { invalid, error } }) => (
      <CommonTextField
        name={name}
        value={value || ''}
        {...(!!defaultValue ? { defaultValue } : {})}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
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
