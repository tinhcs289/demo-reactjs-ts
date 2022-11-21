import type { TCommonRadioGroupFieldProps } from '@/components/inputs/CommonRadioGroupField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';
export type TRHFRadioGroupProps = {
  defaultValue?: string;
} & TRHFInputProps &
  Omit<TCommonRadioGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
