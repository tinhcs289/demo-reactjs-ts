import type { CommonCheckFieldProps } from '@/components/inputs/CommonCheckField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFCheckProps = {
  defaultValue?: string;
  id?: `${string}:check:${string}`;
} & RHFInputProps &
  Omit<CommonCheckFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
