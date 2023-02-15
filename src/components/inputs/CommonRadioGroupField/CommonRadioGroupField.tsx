import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import type { ChangeEvent, ComponentType } from 'react';
import { useCallback, useMemo } from 'react';
import FormGroupWithOptions from '../FormGroupWithOptions';
import type { TCommonRadioGroupFieldProps } from './_types';

const CommonRadioGroupField: ComponentType<TCommonRadioGroupFieldProps> = (props) => {
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
    ...otherProps
  } = props;

  const memoOption = useMemo(() => {
    return options instanceof Array && options.length > 0 ? options : [];
  }, [options]);

  const memoValue = useMemo(() => {
    return !!value?.value ? value : null;
  }, [value]);

  const handleOnchange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event?.target?.value) return;

      const val = (event.target as HTMLInputElement).value as string;
      const checked = (event.target as HTMLInputElement).checked;

      if (!checked) {
        onChange?.(undefined);
        return;
      }

      if (memoOption.length === 0) return;
      const i = memoOption.findIndex((o) => o.value === val);
      if (i < 0) return;
      onChange?.(memoOption[i]);
    },
    [memoOption, onChange]
  );

  const memoOptionsRender = useMemo(() => {
    return (
      <>
        {memoOption.map((option) => {
          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              name={name}
              label={option?.label || option?.name || ''}
              disabled={!!option?.disabled}
              {...option?.InputProps}
              control={
                <Radio
                  {...(!!color ? { color: color as any } : {})}
                  {...(!!error ? { color: 'error' } : {})}
                />
              }
            />
          );
        })}
      </>
    );
  }, [name, memoOption, error, color]);

  return (
    <FormGroupWithOptions {...otherProps}>
      <FormLabel component="label" error={error} sx={{ display: 'inherit', mb: '4px' }}>
        {label || ''}
        {required ? <>&nbsp;{'*'}</> : null}
        {error && !!errorText ? <InputErrorTextWithIcon>{errorText}</InputErrorTextWithIcon> : null}
      </FormLabel>
      <RadioGroup
        {...groupProps}
        {...(!!name ? { name } : {})}
        value={memoValue?.value || ''}
        onChange={handleOnchange as any}
      >
        {memoOptionsRender}
      </RadioGroup>
    </FormGroupWithOptions>
  );
};
export default CommonRadioGroupField;
