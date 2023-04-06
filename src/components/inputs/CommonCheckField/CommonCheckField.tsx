import InputErrorTextWithIcon from '../_components/InputErrorTextWithIcon';
import { useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import type { ComponentType } from 'react';
import FormControlLabelStyled from './FormControlLabelStyled';
import { CommonCheckFieldProps } from './_types';

const CommonCheckField: ComponentType<CommonCheckFieldProps> = (props) => {
  const {
    name,
    label,
    error,
    checked,
    value,
    onChange,
    errorText,
    required,
    inputProps,
    ...formControlProps
  } = props;
  const theme = useTheme();
  return (
    <FormControlLabelStyled
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
          {!!error && !!errorText && (
            <InputErrorTextWithIcon
              style={{ display: 'flex' }}
              textProps={{ sx: { right: 'unset', left: '-50%' } }}
            >
              {errorText}
            </InputErrorTextWithIcon>
          )}
        </>
      }
      {...formControlProps}
      sx={{
        '& label.MuiButtonBase-root': {
          marginBottom: '0 !important',
        },
        ...formControlProps.sx,
      }}
    />
  );
};
export default CommonCheckField;
