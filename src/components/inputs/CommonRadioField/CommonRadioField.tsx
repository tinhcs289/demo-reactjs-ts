import InputErrorTextWithIcon from '../_components/InputErrorTextWithIcon';
import { useTheme } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabelStyled from './FormControlLabelStyled';
import { CommonRadioFieldProps } from './_types';
export default function CommonRadioField(props: CommonRadioFieldProps) {
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
}
