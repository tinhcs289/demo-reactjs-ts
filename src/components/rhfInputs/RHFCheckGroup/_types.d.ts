import type { TCommonCheckGroupFieldProps } from '@/components/inputs/CommonCheckGroupField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';
export type TRHFCheckGroupProps = {
  defaultValue?: string;
} & TRHFInputProps &
  Omit<TCommonCheckGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
