import CommonTextField from '@/components/inputs/CommonTextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';
import { MobileDatePicker as DatePicker } from '@mui/x-date-pickers';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { DEFAULT_FORMAT, DEFAULT_MASK } from './constants';
import type { TCommonDateFieldProps } from './_types';

const CommonDateField: ComponentType<TCommonDateFieldProps> = (props) => {
  const { inputFormat, mask, InputProps, error, errorText, placeholder, sx, ...otherProps } = props;

  const $endAdornment = useMemo(() => {
    return (
      <InputAdornment position="end">
        <CalendarMonthIcon color="inherit" fontSize="inherit" />
      </InputAdornment>
    );
  }, []);

  return (
    <DatePicker
      {...otherProps}
      inputFormat={inputFormat || DEFAULT_FORMAT}
      mask={mask || DEFAULT_MASK}
      {...(!!error ? { error } : {})}
      renderInput={(inputProps) => {
        const { InputProps, ...textfieldProps } = inputProps;
        return (
          <CommonTextField
            {...textfieldProps}
            sx={sx}
            placeholder={placeholder as any}
            error={error}
            errorText={errorText}
            InputProps={{
              endAdornment: $endAdornment,
              ...InputProps,
            }}
          />
        );
      }}
    />
  );
};
export default CommonDateField;
