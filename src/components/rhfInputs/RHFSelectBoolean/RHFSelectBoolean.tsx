import CommonSelectBooleanField from '@/components/inputs/CommonSelectBooleanField';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFSelectBooleanProps } from './_types';
import type { RHFRenderInput } from '@/components/rhfInputs';
export default function RHFSelectBoolean(props: RHFSelectBooleanProps) {
  const { name, control, rules, defaultValue, shouldUnregister, TextFieldProps, ...otherProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, onBlur, value, ref }, fieldState: { invalid, error } }) => {
      return (
        <CommonSelectBooleanField
          ref={ref}
          value={value}
          defaultValue={typeof defaultValue === 'boolean' ? defaultValue : value || undefined}
          onChange={(_, val) => {
            onChange(val);
          }}
          error={!!invalid}
          TextFieldProps={{ ...TextFieldProps, name, onBlur }}
          {...(!!rules?.required ? { required: true } : {})}
          {...(!!error?.message ? { errorText: error?.message } : {})}
          {...otherProps}
        />
      );
    },
    [rules?.required, defaultValue, TextFieldProps, name, otherProps]
  );
  return (
    <Controller
      render={renderInput}
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
    />
  );
}
