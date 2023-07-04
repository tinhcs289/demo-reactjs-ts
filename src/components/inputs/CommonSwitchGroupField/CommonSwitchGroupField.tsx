import { CommonFormGroup } from '@/components/formGroup';
import CommonSwitchField from '@/components/inputs/CommonSwitchField';
import removeAt from '@/helpers/arrayHelpers/removeAt';
import { useCallback, useMemo } from 'react';
import type { CommonSwitchGroupFieldProps, SwitchGroupOption } from './_types';
export default function CommonSwitchGroupField(props: CommonSwitchGroupFieldProps) {
  const {
    name,
    label,
    required,
    error,
    onChange,
    errorText,
    options,
    value,
    eventStopPropagation = true,
    eventPreventDefault = false,
    ...otherProps
  } = props;
  const memoOption = useMemo(() => {
    return options instanceof Array && options.length > 0 ? options : [];
  }, [options]);
  const memoValue = useMemo(() => {
    return value instanceof Array && value.length > 0 ? value : [];
  }, [value]);
  const isChecked = useCallback(
    (option: SwitchGroupOption) => {
      return (
        (memoValue.length > 0 && memoValue.findIndex((v) => v.value === option.value) >= 0) ||
        !!option?.checked
      );
    },
    [memoValue]
  );
  const handleOnchange = useCallback(
    (event: any) => {
      if (eventStopPropagation) {
        event?.stopPropagation?.();
      }
      if (eventPreventDefault) {
        event?.preventDefault?.();
      }
      if (!event?.target?.value) return;
      const val = event.target.value as string;
      const checked = !!event?.target?.checked;
      if (checked) {
        if (memoOption.length === 0) return;
        const i = memoOption.findIndex((o) => o.value === val);
        if (i < 0) return;
        onChange?.([...memoValue, memoOption[i]]);
      } else {
        if (memoValue.length === 0) return;
        const j = memoValue.findIndex((o) => o.value === val);
        if (j < 0) return;
        onChange?.(removeAt(memoValue, j));
      }
    },
    [memoOption, memoValue, onChange, eventStopPropagation, eventPreventDefault]
  );
  const memoOptionsRender = useMemo(() => {
    return (
      <>
        {memoOption.map((option, index) => {
          const checked = isChecked(option);
          return (
            <CommonSwitchField
              key={option.value}
              value={option.value}
              name={name}
              checked={checked}
              label={option?.label || option?.name || ''}
              disabled={!!option?.disabled}
              error={error}
              {...option?.InputProps}
              eventStopPropagation={false}
              sx={{ ...option?.InputProps?.sx, ...(index === 0 ? { mt: '12px' } : {}) }}
            />
          );
        })}
      </>
    );
  }, [name, memoOption, error, isChecked]);
  return (
    <CommonFormGroup
      onChange={handleOnchange as any}
      {...otherProps}
      label={label}
      labelProps={{ inputType: 'switchgroup' }}
      error={error}
      errorText={errorText}
      required={required}
    >
      {memoOptionsRender}
    </CommonFormGroup>
  );
}
