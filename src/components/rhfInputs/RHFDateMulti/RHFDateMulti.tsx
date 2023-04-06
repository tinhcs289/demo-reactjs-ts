import CommonDateMultiField from '@/components/inputs/CommonDateMultiField';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFRenderInput } from '../_types';
import type { RHFDateMultiProps } from './_types';
export default function RHFDateMulti(props: RHFDateMultiProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => (
      <CommonDateMultiField
        value={value}
        {...(!!defaultValue ? { defaultValue } : {})}
        onChange={(dates) => {
          if (Array.isArray(dates) && dates.length > 0) onChange(dates);
          else onChange(undefined);
        }}
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
      name={name}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
