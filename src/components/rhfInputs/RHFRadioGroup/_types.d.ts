import type { TCommonRadioGroupFieldProps } from '@/components/inputs/CommonRadioGroupField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFRadioGroupProps = {
  defaultValue?: string;
  id?: `${string}:radio-group:${string}`;
} & TRHFInputProps &
  Omit<TCommonRadioGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
export type { TRadioGroupOption } from '@/components/inputs/CommonRadioGroupField';
