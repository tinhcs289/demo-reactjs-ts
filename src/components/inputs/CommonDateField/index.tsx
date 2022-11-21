import CommonTextField from '@/components/inputs/CommonTextField';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { DEFAULT_FORMAT, DEFAULT_MASK } from './constants';
import type { TCommonDateFieldProps } from './_types';

const CommonDateField: React.FC<TCommonDateFieldProps> = (props) => {
  const { inputFormat, mask, InputProps, error, errorText, ...otherProps } = props;
  return (
    <DatePicker
      {...otherProps}
      inputFormat={inputFormat || DEFAULT_FORMAT}
      mask={mask || DEFAULT_MASK}
      {...(!!error ? { error } : {})}
      renderInput={(inputProps) => {
        return <CommonTextField {...inputProps} error={error} helperText={errorText} />;
      }}
    />
  );
};
export default CommonDateField;
