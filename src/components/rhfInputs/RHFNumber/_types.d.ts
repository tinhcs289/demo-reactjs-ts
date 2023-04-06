import type { CommonNumberFieldProps } from '@/components/inputs/CommonNumberField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFNumberProps = {
  defaultValue?: string;
  id?: `${string}:number:${string}`;
} & RHFInputProps &
  Omit<CommonNumberFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
