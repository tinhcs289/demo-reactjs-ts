import CommonCheckField from '@/components/inputs/CommonCheckField';
import type { ComponentType } from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFCheckProps } from './_types';

const RHFCheck: ComponentType<TRHFCheckProps> = (props) => {
  const { name, control, rules, defaultValue, shouldUnregister, label, inputProps, ...otherProps } = props;

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
        <CommonCheckField
          label={label}
          name={name}
          value={value}
          checked={value === true}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={onChange}
          inputProps={{ inputRef: ref, onBlur, ...inputProps }}
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
          {...otherProps}
        />
      )}
    />
  );
};
export default RHFCheck;