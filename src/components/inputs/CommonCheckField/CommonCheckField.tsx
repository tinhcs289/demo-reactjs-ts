import { styled, useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useMemo } from 'react';
import InputErrorTextWithIcon from '../_components/InputErrorTextWithIcon';
import { CommonCheckFieldProps } from './_types';
const FormControlLabelStyled = styled(FormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  width: '100%',
  marginRight: 0,
  marginLeft: 0,
  minHeight: '42px',
  background: theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.background.default,
  '&:hover': {
    background: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
  },
  '& span.MuiButtonBase-root.MuiCheckbox-root': {
    marginBottom: '0 !important',
  },
}));
export default function CommonCheckField(props: CommonCheckFieldProps) {
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
  const $Label = useMemo(() => {
    if (!label) return null;
    return (
      <>
        {label}
        {required ? ` *` : ''}
      </>
    );
  }, [label, required]);
  const checkBoxStyle = useMemo(() => {
    if (!error) return {};
    return { style: { ...(inputProps?.style || {}), color: theme.palette.error.main } };
  }, [error, inputProps?.style, theme]);
  const $Control = useMemo(() => {
    return (
      <>
        <Checkbox
          name={name}
          checked={!!checked}
          onChange={onChange}
          value={value}
          color="primary"
          {...(checkBoxStyle as any)}
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
    );
  }, [name, checked, onChange, value, error, errorText, inputProps, checkBoxStyle]);
  return (
    <FormControlLabelStyled
      label={$Label}
      control={$Control}
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
