import CommonTextField from '@/components/inputs/CommonTextField';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InputAdornment from '@mui/material/InputAdornment';
import { MobileDateTimePicker as DateTimePicker } from '@mui/x-date-pickers';
import type { FC } from 'react';
import { useMemo } from 'react';
import { DEFAULT_FORMAT, DEFAULT_MASK } from './constants';
import type { TCommonDateTimeFieldProps } from './_types';

const CommonDateTimeField: FC<TCommonDateTimeFieldProps> = (props) => {
  const { inputFormat, mask, InputProps, error, errorText, sx, placeholder, ...otherProps } = props;

  const $endAdornment = useMemo(() => {
    return (
      <InputAdornment position="end">
        <EventNoteIcon color="inherit" fontSize="inherit" />
      </InputAdornment>
    );
  }, []);

  return (
    <DateTimePicker
      {...otherProps}
      inputFormat={inputFormat || DEFAULT_FORMAT}
      mask={mask || DEFAULT_MASK}
      {...(!!error ? { error } : {})}
      renderInput={(inputProps) => {
        const { InputProps, ...textfieldProps } = inputProps;
        return (
          <CommonTextField
            {...textfieldProps}
            placeholder={placeholder as any}
            sx={sx}
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
export default CommonDateTimeField;
