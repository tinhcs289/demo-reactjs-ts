import type { ToggledOption, ToggledOptionValue } from './_types';
export function toValue(option: ToggledOption): ToggledOptionValue | null {
  if (!option) return null;
  return {
    value: option.value,
    label: option.label,
    disabled: option.disabled,
    data: option.data,
  };
}
export function toValues(options?: ToggledOption[]): ToggledOptionValue[] {
  if (!(options instanceof Array && options.length > 0)) return [];
  return options.map((o) => toValue(o)).filter((o) => !!o) as any;
}