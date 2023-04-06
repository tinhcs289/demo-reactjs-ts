import CommonKeyboardDateField from '@/components/inputs/CommonKeyboardDateField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFKeyboardDateProps } from './_types';
export default function RHFKeyboardDate(props: RHFKeyboardDateProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onBlur, onChange, value, name, ref }, fieldState: { invalid, error } }) => {
      const _props: { [x: string]: any } = { ...inputProps };
      if (!!rules?.required) _props.required = true;
      if (!!error?.message) _props.errorText = error.message;
      return (
        <CommonKeyboardDateField
          name={name}
          value={value || null}
          defaultValue={defaultValue || value || null}
          onChange={onChange}
          onBlur={onBlur}
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
