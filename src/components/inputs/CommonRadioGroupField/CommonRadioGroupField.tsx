import { CommonFormGroup } from '@/components/formGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo } from 'react';
import type { CommonRadioGroupFieldProps } from './_types';
export default function CommonRadioGroupField(props: CommonRadioGroupFieldProps) {
  const {
    name,
    label,
    required,
    error,
    onChange,
    errorText,
    color,
    options,
    value,
    groupProps,
    eventStopPropagation = true,
    eventPreventDefault = false,
    optionsBoxProps,
    ...otherProps
  } = props;
  const memoOption = useMemo(() => {
    return options instanceof Array && options.length > 0 ? options : [];
  }, [options]);
  const memoValue = useMemo(() => {
    return !!value?.value ? value : null;
  }, [value]);
  const handleUnCheck = useCallback(
    (event: any) => {
      if (eventStopPropagation) {
        event?.stopPropagation?.();
      }
      if (eventPreventDefault) {
        event?.preventDefault?.();
      }
      onChange?.(undefined);
    },
    [eventStopPropagation, eventPreventDefault, onChange]
  );
  const handleOnchange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (eventStopPropagation) {
        event?.stopPropagation?.();
      }
      if (eventPreventDefault) {
        event?.preventDefault?.();
      }
      if (!event?.target?.value) return;
      const val = (event.target as HTMLInputElement).value as string;
      const checked = (event.target as HTMLInputElement).checked;
      if (!checked) {
        onChange?.(undefined);
        return;
      }
      if (memoOption.length === 0) return;
      const i = memoOption.findIndex((o) => o.value === val);
      if (i < 0) {
        onChange?.(undefined);
        return;
      }
      onChange?.(memoOption[i]);
      return;
    },
    [memoOption, onChange, eventStopPropagation, eventPreventDefault]
  );
  const $Options = useMemo(() => {
    return (
      <>
        {memoOption.map((option, index) => {
          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              name={name}
              label={option?.label || option?.name || ''}
              disabled={!!option?.disabled}
              {...option?.InputProps}
              sx={{
                ...option?.InputProps?.sx,
                ...(index === 0 ? { mt: '12px' } : {}),
              }}
              control={
                <Radio
                  onClick={handleUnCheck}
                  {...(!!color ? { color: color as any } : {})}
                  {...(!!error ? { color: 'error' } : {})}
                />
              }
            />
          );
        })}
      </>
    );
  }, [name, memoOption, error, color, handleUnCheck]);
  return (
    <CommonFormGroup
      {...otherProps}
      label={label}
      labelProps={{ inputType: 'radiogroup' }}
      error={error}
      errorText={errorText}
      required={required}
    >
      <RadioGroup
        {...groupProps}
        {...(!!name ? { name } : {})}
        value={memoValue?.value || ''}
        onChange={handleOnchange as any}
      >
        {$Options}
      </RadioGroup>
    </CommonFormGroup>
  );
}
