import CommonSwitchGroupField from '@/components/inputs/CommonSwitchGroupField';
import type { ComponentType } from 'react';
import { Controller } from 'react-hook-form';
import type { TRHFSwitchGroupProps } from './_types';

const RHFSwitchGroup: ComponentType<TRHFSwitchGroupProps> = (props) => {
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
        <CommonSwitchGroupField
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
export default RHFSwitchGroup;
