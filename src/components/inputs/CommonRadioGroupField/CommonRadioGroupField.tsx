import FormLabelStyled from '@/components/inputs/_components/FormLabelStyled';
import { TextWithRequiredMark } from '@/components/typo';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo } from 'react';
import FormGroupWithOptions from '../_components/FormGroupWithOptions';
import InputErrorTextWithIcon from '../_components/InputErrorTextWithIcon';
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
              sx={{ ...option?.InputProps?.sx, ...(index === 0 ? { mt: '12px' } : {}) }}
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
  const $Label = useMemo(() => {
    if (!label && !errorText) return;
    return (
      <FormLabelStyled {...({ component: 'label' } as any)} error={error} inputType="radiogroup">
        {!label ? null : <TextWithRequiredMark required={required}>{label}</TextWithRequiredMark>}
        {!!error && !!errorText ? <InputErrorTextWithIcon>{errorText}</InputErrorTextWithIcon> : null}
      </FormLabelStyled>
    );
  }, [error, errorText, label, required]);
  return (
    <FormGroupWithOptions {...otherProps}>
      {$Label}
      <RadioGroup
        {...groupProps}
        {...(!!name ? { name } : {})}
        value={memoValue?.value || ''}
        onChange={handleOnchange as any}
      >
        {$Options}
      </RadioGroup>
    </FormGroupWithOptions>
  );
}
