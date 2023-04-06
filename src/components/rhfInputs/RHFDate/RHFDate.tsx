import CommonDateField from '@/components/inputs/CommonDateField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFDateProps } from './_types';
export default function RHFDate(props: RHFDateProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => {
      const _props: { [x: string]: any } = { ...inputProps };
      if (!!rules?.required) _props.required = true;
      if (!!error?.message) _props.errorText = error.message;
      return (
        <CommonDateField
          value={value || null}
          defaultValue={defaultValue || value || null}
          onChange={onChange}
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
