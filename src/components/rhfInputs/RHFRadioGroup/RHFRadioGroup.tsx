import CommonRadioGroupField from '@/components/inputs/CommonRadioGroupField';
import type { ComponentType } from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFRadioGroupProps } from './_types';

const RHFRadioGroup: ComponentType<TRHFRadioGroupProps> = (props) => {
  const { name, control, rules, defaultValue, shouldUnregister, label, ...inputProps } = props;

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
        <CommonRadioGroupField
          label={label}
          name={name}
          value={value}
          {...(!!defaultValue ? { defaultValue } : {})}
          onChange={onChange}
          onBlur={onBlur}
          // ref={ref}
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
export default RHFRadioGroup;
