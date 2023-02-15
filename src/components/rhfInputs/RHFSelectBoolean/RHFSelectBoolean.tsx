import CommonSelectBooleanField from '@/components/inputs/CommonSelectBooleanField';
import type { ComponentType } from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFSelectBooleanProps } from './_types';

const RHFSelectBoolean: ComponentType<TRHFSelectBooleanProps> = (props) => {
  const { name, control, rules, defaultValue, shouldUnregister, TextFieldProps, ...otherProps } = props;
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
          <CommonSelectBooleanField
            ref={ref}
            value={value}
            defaultValue={typeof defaultValue === 'boolean' ? defaultValue : value}
            onChange={(_, val) => {
              onChange(val);
            }}
            error={!!invalid}
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
export default RHFSelectBoolean;
