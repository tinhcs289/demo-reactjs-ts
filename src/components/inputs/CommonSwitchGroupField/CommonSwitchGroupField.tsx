import CommonSwitchField from '@/components/inputs/CommonSwitchField';
import FormGroupWithOptions from '../_components/FormGroupWithOptions';
import InputErrorTextWithIcon from '../_components/InputErrorTextWithIcon';
import removeAt from '@/helpers/arrayHelpers/removeAt';
import FormLabel from '@mui/material/FormLabel';
import type { ComponentType } from 'react';
import { useCallback, useMemo } from 'react';
import type { CommonSwitchGroupFieldProps, SwitchGroupOption } from './_types';

const CommonSwitchGroupField: ComponentType<CommonSwitchGroupFieldProps> = (props) => {
  const { name, label, required, error, onChange, errorText, options, value, ...otherProps } = props;

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

  const memoOptionsRender = useMemo(() => {
    return (
      <>
        {memoOption.map((option) => {
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
            />
          );
        })}
      </>
    );
  }, [name, memoOption, error, isChecked]);

  return (
    <FormGroupWithOptions onChange={handleOnchange as any} {...otherProps}>
      <FormLabel component="label" error={error} sx={{ display: 'inherit', mb: '4px' }}>
        {label || ''}
        {required ? <>&nbsp;{'*'}</> : null}
        {error && !!errorText ? <InputErrorTextWithIcon>{errorText}</InputErrorTextWithIcon> : null}
      </FormLabel>
      {memoOptionsRender}
    </FormGroupWithOptions>
  );
};
export default CommonSwitchGroupField;
