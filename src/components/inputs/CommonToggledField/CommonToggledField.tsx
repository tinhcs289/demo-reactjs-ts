import { CommonFormGroup } from '@/components/formGroup';
import render from '@/helpers/reactHelpers/render';
import get from 'lodash/get';
import type { MouseEvent } from 'react';
import { useCallback, useMemo } from 'react';
import ButtonIconAdornment from './ButtonIconAdornment';
import ToggleButtonGroupStyled from './ToggleButtonGroupStyled';
import ToggleButtonStyled from './ToggleButtonStyled';
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
    //buttonComponent: CustomButton,
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
      const {
        value: optionValue,
        label: optionLabel,
        icon,
        iconProps,
        startIcon,
        startIconProps,
        endIcon,
        endIconProps,
        ...otherOptionProps
      } = o;
      return (
        <ToggleButtonStyled
          size="small"
          key={optionValue}
          value={optionValue}
          aria-label={optionLabel || optionValue}
          {...otherOptionProps}
        >
          {!icon ? (
            <>
              {!!startIcon && (
                <ButtonIconAdornment
                  position="start"
                  size={startIconProps?.fontSize || otherOptionProps?.size}
                >
                  {render(startIcon, startIconProps)}
                </ButtonIconAdornment>
              )}
              {optionLabel}
              {!!endIcon && (
                <ButtonIconAdornment position="end" size={endIconProps?.fontSize || otherOptionProps?.size}>
                  {render(endIcon, endIconProps)}
                </ButtonIconAdornment>
              )}
            </>
          ) : (
            render(icon, iconProps)
          )}
        </ToggleButtonStyled>
      );
    });
  }, [options]);
  return (
    <CommonFormGroup
      {...formGroupProps}
      label={label}
      disableFloatingLabel
      error={error}
      errorText={errorText}
      required={required}
    >
      <ToggleButtonGroupStyled
        {...otherProps}
        exclusive={!isMultiple}
        {...valueProps}
        onChange={handleChange}
      >
        {$Buttons}
      </ToggleButtonGroupStyled>
    </CommonFormGroup>
  );
}
