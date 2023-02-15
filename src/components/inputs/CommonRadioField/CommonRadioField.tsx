import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import { useTheme } from '@mui/material';
import Radio from '@mui/material/Radio';
import type { ComponentType } from 'react';
import FormControlLabelStyled from './FormControlLabelStyled';
import { TCommonRadioFieldProps } from './_types';

const CommonRadioField: ComponentType<TCommonRadioFieldProps> = (props) => {
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
          <Radio
            name={name}
            checked={!!checked}
            onChange={onChange}
            value={value || !!checked}
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
export default CommonRadioField;
