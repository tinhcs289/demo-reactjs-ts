import { CommonFormGroup } from '@/components/formGroup';
import CommonCheckField from '@/components/inputs/CommonCheckField';
import removeAt from '@/helpers/arrayHelpers/removeAt';
import { useCallback, useMemo } from 'react';
import type { CheckGroupOption, CommonCheckGroupFieldProps } from './_types';
export default function CommonCheckGroupField(props: CommonCheckGroupFieldProps) {
  const { name, label, required, error, onChange, errorText, options, value, ...otherProps } = props;
  const memoOption = useMemo(() => {
    return options instanceof Array && options.length > 0 ? options : [];
  }, [options]);
  const memoValue = useMemo(() => {
    return value instanceof Array && value.length > 0 ? value : [];
  }, [value]);
  const isChecked = useCallback(
    (option: CheckGroupOption) => {
      return (
        (memoValue.length > 0 && memoValue.findIndex((v) => v.value === option.value) >= 0) ||
        !!option?.checked
      );
    },
    [memoValue]
  );
  const handleOnchange = useCallback(
    (event: any) => {
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
    [memoOption, memoValue, onChange]
  );
  const $Options = useMemo(() => {
    return memoOption.map((option, index) => {
      const checked = isChecked(option);
      return (
        <CommonCheckField
          key={option.value}
          value={option.value}
          name={name}
          checked={checked}
          label={option?.label || option?.name || ''}
          disabled={!!option?.disabled}
          error={error}
          {...option?.InputProps}
          sx={{ ...option?.InputProps?.sx, ...(index === 0 ? { mt: '12px' } : {}) }}
        />
      );
    });
  }, [name, memoOption, error, isChecked]);
  return (
    <CommonFormGroup
      onChange={handleOnchange as any}
      {...otherProps}
      label={label}
      labelProps={{ inputType: 'checkgroup' }}
      error={error}
      errorText={errorText}
      required={required}
    >
      {$Options}
    </CommonFormGroup>
  );
}
