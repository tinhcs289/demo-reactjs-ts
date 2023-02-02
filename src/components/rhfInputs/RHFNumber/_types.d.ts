import type { TCommonNumberFieldProps } from '@/components/inputs/CommonNumberField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';

export type TRHFNumberProps = {
  defaultValue?: string;
  id?: `${string}:number:${string}`;
} & TRHFInputProps &
  Omit<TCommonNumberFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
