import CommonTimeField from '@/components/inputs/CommonTimeField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { cloneDeep } from 'lodash';
import type { Moment } from 'moment';
import moment from 'moment';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFTimeProps } from './_types';
export default function RHFTime(props: RHFTimeProps) {
  const { name, control, rules, defaultValue, shouldUnregister, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, value: _value, ref }, fieldState: { invalid, error } }) => {
      const _props: { [x: string]: any } = { ...inputProps };
      if (!!rules?.required) _props.required = true;
      if (!!error?.message) _props.errorText = error.message;
      const value = moment.isMoment(_value) ? moment(cloneDeep(_value)) : null;
      return (
        <CommonTimeField
          value={value}
          //defaultValue={defaultValue || value || null}
          onChange={(date: Moment | null) => {
            const newDate = !!date && moment.isMoment(date) ? moment(cloneDeep(date)) : null;
            onChange(newDate);
          }}
          inputRef={ref}
          error={invalid}
          {..._props}
        />
      );
    },
    [rules?.required, inputProps] //, defaultValue]
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
