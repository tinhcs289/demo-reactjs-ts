import FormGroupWithOptions from '@/components/inputs/_components/FormGroupWithOptions';
import FormLabelStyled from '@/components/inputs/_components/FormLabelStyled';
import InputErrorTextWithIcon from '@/components/inputs/_components/InputErrorTextWithIcon';
import { TextWithRequiredMark } from '@/components/typo';
import render from '@/helpers/reactHelpers/render';
import ToggleButton from '@mui/material/ToggleButton';
import get from 'lodash/get';
import type { MouseEvent } from 'react';
import { useCallback, useMemo } from 'react';
import ToggleButtonGroupStyled from './ToggleButtonGroupStyled';
import type { CommonToggledFieldProps } from './_types';
import { toValue, toValues } from './functions';
export default function CommonToggledField(props: CommonToggledFieldProps) {
  const {
    value,
    onChange,
    options,
    multiple = false,
    label,
    error,
    errorText,
    required,
    formGroupProps,
    ...otherProps
  } = props;
  const isMultiple = useMemo(() => !!multiple, [multiple]);
  const valueProps: { value: string } | {} = useMemo(() => {
    if (!value) return { value: isMultiple ? [] : null };
    if (!isMultiple) {
      return { value: get(value as any, 'value', null) as string };
    } else {
      if (!(value instanceof Array && value.length > 0)) return { value: [] };
      return { value: value.map((val) => val.value).filter((val) => !!val) };
    }
  }, [value, isMultiple]);
  const handleChange = useCallback(
    (event: MouseEvent<HTMLElement, globalThis.MouseEvent>, eventValue: any) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      if (!(options instanceof Array && options.length > 0)) {
        onChange?.(null);
        return;
      }
      if (!eventValue || eventValue?.length === 0) {
        onChange?.((isMultiple ? toValues(value as any) : null) as any);
        return;
      }
      if (!isMultiple) {
        const newValue = options.find((o) => o?.value === eventValue);
        onChange?.((toValue(newValue as any) || null) as any);
        return;
      } else {
        const values = options.filter((o) => (eventValue as string[]).includes(o.value));
        onChange?.(toValues(values) as any);
        return;
      }
    },
    [onChange, options, isMultiple, value]
  );
  const $Buttons = useMemo(() => {
    if (!(options instanceof Array && options.length > 0)) {
      return null;
    }
    return options.map((o, i) => {
      const { value: optionValue, label: optionLabel, icon, iconProps, ...otherOptionProps } = o;
      return (
        <ToggleButton
          size="small"
          key={optionValue}
          value={optionValue}
          aria-label={optionLabel || optionValue}
          {...otherOptionProps}
        >
          {!icon ? optionLabel : render(icon, iconProps)}
        </ToggleButton>
      );
    });
  }, [options]);
  const $Label = useMemo(() => {
    if (!label && !errorText) return;
    return (
      <FormLabelStyled {...({ component: 'label' } as any)} error={error} inputType="toggle">
        {!label ? null : <TextWithRequiredMark required={required}>{label}</TextWithRequiredMark>}
        {!!error && !!errorText ? <InputErrorTextWithIcon>{errorText}</InputErrorTextWithIcon> : null}
      </FormLabelStyled>
    );
  }, [error, errorText, label, required]);
  return (
    <FormGroupWithOptions {...formGroupProps}>
      {$Label}
      <ToggleButtonGroupStyled
        {...otherProps}
        exclusive={!isMultiple}
        {...valueProps}
        onChange={handleChange}
      >
        {$Buttons}
      </ToggleButtonGroupStyled>
    </FormGroupWithOptions>
  );
}
