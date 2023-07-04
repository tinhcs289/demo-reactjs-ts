import { CommonFormControlLabel, InputErrorTextWithIcon } from '@/components/formGroup';
import { TextWithRequiredMark } from '@/components/typo';
import { useTheme } from '@mui/material';
import Radio from '@mui/material/Radio';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo } from 'react';
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
    eventStopPropagation = true,
    eventPreventDefault = false,
    ...formControlProps
  } = props;
  const theme = useTheme();
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
  const $Label = useMemo(
    () => <TextWithRequiredMark required={required}>{label}</TextWithRequiredMark>,
    [required, label]
  );
  const $Error = useMemo(
    () =>
      !!error && !!errorText ? (
        <InputErrorTextWithIcon
          style={{ display: 'flex' }}
          textProps={{ sx: { right: 'unset', left: '-50%' } }}
        >
          {errorText}
        </InputErrorTextWithIcon>
      ) : null,
    [error, errorText]
  );
  const $Control = useMemo(
    () => (
      <>
        <Radio
          name={name}
          checked={!!checked}
          onChange={handleOnChange}
          value={value || !!checked}
          color="primary"
          {...(!!error ? { style: { ...(inputProps?.style || {}), color: theme.palette.error.main } } : {})}
          {...inputProps}
        />
        {$Error}
      </>
    ),
    [$Error, handleOnChange, checked, error, inputProps, name, theme, value]
  );
  return (
    <CommonFormControlLabel
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
