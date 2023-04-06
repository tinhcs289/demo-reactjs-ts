import type { CommonRadioGroupFieldProps } from '@/components/inputs/CommonRadioGroupField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFRadioGroupProps = {
  defaultValue?: string;
  id?: `${string}:radio-group:${string}`;
} & RHFInputProps &
  Omit<CommonRadioGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
export type { RadioGroupOption } from '@/components/inputs/CommonRadioGroupField';
