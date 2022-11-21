import CommonSelectField from '@/components/inputs/CommonSelectField';
import type { TAutoCompleteOption } from '@/components/inputs/CommonSelectField/_types';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import React from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFSelectProps } from './_types';

const RHFSelect: React.FC<TRHFSelectProps> = (props) => {
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
        field: {
          onChange,
          onBlur,
          value,
          // name,
          // ref,
        },
        fieldState: {
          invalid,
          // isTouched,
          // isDirty,
          error,
        },
      }) => {
        return (
          <CommonSelectField
            multiple={multiple}
            value={value}
            defaultValue={
              multiple
                ? arrayOrEmpty(defaultValue || value)
                : (defaultValue as TAutoCompleteOption)?.value || value?.value
            }
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
                  helperText: error?.message,
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
