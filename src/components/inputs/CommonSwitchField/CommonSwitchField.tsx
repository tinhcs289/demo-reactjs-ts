import { CommonFormControlLabel, InputErrorTextWithIcon } from '@/components/formGroup';
import { TextWithRequiredMark } from '@/components/typo';
import { useTheme } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useMemo, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import type { CommonSwitchFieldProps } from './_types';
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
    eventStopPropagation = true,
    eventPreventDefault = false,
    ...formControlProps
  } = props;
  const theme = useTheme();
  const $Label = useMemo(() => {
    if (!label) return null;
    return <TextWithRequiredMark required={required}>{label}</TextWithRequiredMark>;
  }, [label, required]);
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (eventStopPropagation) {
        event?.stopPropagation?.();
      }
      if (eventPreventDefault) {
        event?.preventDefault?.();
      }
      onChange?.(event, checked);
    },
    [eventStopPropagation, eventPreventDefault, onChange]
  );
  const $Switch = useMemo(() => {
    return (
      <Switch
        name={name}
        checked={!!checked}
        onChange={handleOnChange}
        value={value}
        color="primary"
        {...(!!error ? { style: { ...(inputProps?.style || {}), color: theme.palette.error.main } } : {})}
        {...inputProps}
      />
    );
  }, [name, checked, handleOnChange, value, error, inputProps, theme]);
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
    <CommonFormControlLabel
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
