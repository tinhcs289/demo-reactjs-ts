import type { TCommonCheckFieldProps } from '@/components/inputs/CommonCheckField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';
export type TRHFCheckProps = {
  defaultValue?: string;
} & TRHFInputProps &
  Omit<TCommonCheckFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
