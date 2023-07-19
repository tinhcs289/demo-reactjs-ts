import CommonDateMultiField from '@/components/inputs/CommonDateMultiField';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFRenderInput } from '../_types';
import type { RHFDateMultiProps } from './_types';
export default function RHFDateMulti(props: RHFDateMultiProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => {
      const _props: { [x: string]: any } = { ...inputProps };
      if (!!rules?.required) _props.required = true;
      if (!!error?.message) _props.errorText = error.message;
      return (
        <CommonDateMultiField
          value={value}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={(dates) => {
            if (Array.isArray(dates) && dates.length > 0) onChange(dates);
            else onChange(undefined);
          }}
          inputRef={ref}
          error={invalid}
          {..._props}
        />
      );
    },
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
