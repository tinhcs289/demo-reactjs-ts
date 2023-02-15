import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import { useTheme } from '@mui/material';
import Switch from '@mui/material/Switch';
import type { ComponentType } from 'react';
import FormControlLabelStyled from './FormControlLabelStyled';
import type { TCommonSwitchFieldProps } from './_types';

const CommonSwitchField: ComponentType<TCommonSwitchFieldProps> = (props) => {
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
          <Switch
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
    />
  );
};
export default CommonSwitchField;
