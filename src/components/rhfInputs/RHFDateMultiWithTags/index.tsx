import CommonDateMultiWithTagsField from '@/components/inputs/CommonDateMultiWithTagsField';
import React from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFDateMultiWithTagsProps } from './_types';

const RHFDateMultiWithTags: React.FC<TRHFDateMultiWithTagsProps> = (props) => {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
      render={({
        field: { onBlur, onChange, value, name, ref },
        fieldState: {
          invalid,
          // isTouched,
          // isDirty,
          error,
        },
      }) => (
        <CommonDateMultiWithTagsField
          name={name}
          value={value}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
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
      )}
    />
  );
};
export default RHFDateMultiWithTags;
