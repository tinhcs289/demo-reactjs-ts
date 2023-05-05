import InputErrorTextWithIcon from '../_components/InputErrorTextWithIcon';
import { useTheme } from '@mui/material';
import Switch from '@mui/material/Switch';
import FormControlLabelStyled from './FormControlLabelStyled';
import type { CommonSwitchFieldProps } from './_types';
import { useMemo } from 'react';
export default function CommonSwitchField(props: CommonSwitchFieldProps) {
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
  const $Switch = useMemo(() => {
    return (
      <Switch
        name={name}
        checked={!!checked}
        onChange={onChange}
        value={value}
        color="primary"
        {...(!!error ? { style: { ...(inputProps?.style || {}), color: theme.palette.error.main } } : {})}
        {...inputProps}
      />
    );
  }, [name, checked, onChange, value, error, inputProps, theme]);
  const $Error = useMemo(() => {
    if (!error || !errorText) return null;
    return (
      <InputErrorTextWithIcon
        style={{ display: 'flex' }}
        textProps={{ sx: { right: 'unset', left: '-50%' } }}
      >
        {errorText}
      </InputErrorTextWithIcon>
    );
  }, [error, errorText]);
  return (
    <FormControlLabelStyled
      label={$Label}
      control={
        <>
          {$Switch}
          {$Error}
        </>
      }
      {...formControlProps}
    />
  );
}
