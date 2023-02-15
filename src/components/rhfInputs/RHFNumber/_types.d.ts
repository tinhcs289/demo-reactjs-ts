import type { TCommonNumberFieldProps } from '@/components/inputs/CommonNumberField';
import type { TRHFInputProps } from '@/components/rhfInputs';

export type TRHFNumberProps = {
  defaultValue?: string;
  id?: `${string}:number:${string}`;
} & TRHFInputProps &
  Omit<TCommonNumberFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
