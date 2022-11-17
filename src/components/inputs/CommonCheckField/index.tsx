import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import { useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import { TCommonCheckFieldProps } from './_types';

const CommonCheckField: React.FC<TCommonCheckFieldProps> = (props) => {
  const { name, label, error, checked, value, onChange, errorText, required, inputProps, ...formControlProps } = props;
  const theme = useTheme();
  return (
    <FormControlLabel
      label={
        <>
          {label}
          {required ? ` *` : ''}
        </>
      }
      control={
        <>
          <Checkbox
            name={name}
            checked={!!checked}
            onChange={onChange}
            value={value}
            color="primary"
            {...(!!error ? { style: { ...(inputProps?.style || {}), color: theme.palette.error.main } } : {})}
            {...inputProps}
          />
          {!!error && !!errorText && <InputErrorTextWithIcon>{errorText}</InputErrorTextWithIcon>}
        </>
      }
      {...formControlProps}
    />
  );
};
export default CommonCheckField;
