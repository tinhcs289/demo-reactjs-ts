import { CommonFormControlLabel, InputErrorTextWithIcon } from '@/components/formGroup';
import { TextWithRequiredMark } from '@/components/typo';
import { useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useMemo, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { CommonCheckFieldProps } from './_types';
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
    eventStopPropagation = true,
    eventPreventDefault = false,
    ...formControlProps
  } = props;
  const theme = useTheme();
  const $Label = useMemo(() => {
    if (!label) return null;
    return <TextWithRequiredMark required={required}>{label}</TextWithRequiredMark>;
  }, [label, required]);
  const checkBoxStyle = useMemo(() => {
    if (!error) return {};
    return { style: { ...(inputProps?.style || {}), color: theme.palette.error.main } };
  }, [error, inputProps?.style, theme]);
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
  const $Control = useMemo(() => {
    return (
      <>
        <Checkbox
          name={name}
          checked={!!checked}
          onChange={handleOnChange}
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
  }, [name, checked, value, error, errorText, inputProps, checkBoxStyle, handleOnChange]);
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
