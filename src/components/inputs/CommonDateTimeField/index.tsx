import CommonTextField from '@/components/inputs/CommonTextField';
import { DateTimePicker } from '@mui/x-date-pickers';
import React from 'react';
import { DEFAULT_FORMAT, DEFAULT_MASK } from './constants';
import type { TCommonDateTimeFieldProps } from './_types';

const CommonDateTimeField: React.FC<TCommonDateTimeFieldProps> = (props) => {
  const { inputFormat, mask, InputProps, error, errorText, ...otherProps } = props;
  return (
    <DateTimePicker
      {...otherProps}
      inputFormat={inputFormat || DEFAULT_FORMAT}
      mask={mask || DEFAULT_MASK}
      {...(!!error ? { error } : {})}
      renderInput={(inputProps) => {
        return <CommonTextField {...inputProps} error={error} errorText={errorText} />;
      }}
    />
  );
};
export default CommonDateTimeField;
