import CommonSelectField from '@/components/inputs/CommonSelectField';
import type { ComponentType } from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFSelectProps } from './_types';

const RHFSelect: ComponentType<TRHFSelectProps> = (props) => {
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
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: {
          invalid,
          // isTouched,
          // isDirty,
          error,
        },
      }) => {
        return (
          <CommonSelectField
            ref={ref}
            multiple={multiple}
            value={value}
            defaultValue={defaultValue || value}
            onChange={(_, val) => {
              onChange(val);
            }}
            error={!!invalid}
            options={options}
            TextFieldProps={{
              ...TextFieldProps,
              name,
              onBlur,
            }}
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
            {...otherProps}
          />
        );
      }}
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
    />
  );
};
export default RHFSelect;
