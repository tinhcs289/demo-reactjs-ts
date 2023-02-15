import type { TCommonCheckFieldProps } from '@/components/inputs/CommonCheckField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFCheckProps = {
  defaultValue?: string;
  id?: `${string}:check:${string}`;
} & TRHFInputProps &
  Omit<TCommonCheckFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
