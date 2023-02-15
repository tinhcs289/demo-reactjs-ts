import CommonTextField from '@/components/inputs/CommonTextField';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InputAdornment from '@mui/material/InputAdornment';
import { MobileTimePicker as TimePicker } from '@mui/x-date-pickers';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { DEFAULT_FORMAT, DEFAULT_MASK } from './constants';
import type { TCommonTimeFieldProps } from './_types';

const CommonTimeField: ComponentType<TCommonTimeFieldProps> = (props) => {
  const { inputFormat, mask, InputProps, error, errorText, sx, placeholder, ...otherProps } = props;

  const $endAdornment = useMemo(() => {
    return (
      <InputAdornment position="end">
        <AccessTimeIcon color="inherit" fontSize="inherit" />
      </InputAdornment>
    );
  }, []);

  return (
    <TimePicker
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
export default CommonTimeField;
