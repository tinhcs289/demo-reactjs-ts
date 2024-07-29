import CommonGooglePlaceField from '@/components/inputs/CommonGooglePlaceField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFGooglePlaceProps } from './_types';
export default function RHFGooglePlace(props: RHFGooglePlaceProps) {
  const {
    name,
    multiple,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    options = [],
    TextFieldProps,
    ...otherProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, onBlur, value, ref }, fieldState: { invalid, error } }) => {
      return (
        <CommonGooglePlaceField
          ref={ref}
          // @ts-ignore
          multiple={multiple}
          value={value}
          defaultValue={defaultValue || value || undefined}
          // @ts-ignore
          onChange={(_, val) => {
            onChange(val);
          }}
          error={!!invalid}
          options={options}
          TextFieldProps={{ ...TextFieldProps, name, onBlur }}
          {...(!!rules?.required ? { required: true } : {})}
          {...(!!error?.message ? { errorText: error?.message } : {})}
          {...otherProps}
        />
      );
    },
    [rules?.required, defaultValue, TextFieldProps, multiple, name, options, otherProps]
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
