import type { CommonCheckGroupFieldProps } from '@/components/inputs/CommonCheckGroupField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFCheckGroupProps = {
  defaultValue?: string;
  id?: `${string}:check-group:${string}`;
} & RHFInputProps &
  Omit<CommonCheckGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
export type { CheckGroupOption } from '@/components/inputs/CommonCheckGroupField';
