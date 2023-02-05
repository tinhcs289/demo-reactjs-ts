import type { TCommonRadioFieldProps } from '@/components/inputs/CommonRadioField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';
export type TRHFRadioProps = {
  defaultValue?: string;
  id?: `${string}:radio:${string}`;
} & TRHFInputProps &
  Omit<TCommonRadioFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
