import type { TCommonCheckGroupFieldProps } from '@/components/inputs/CommonCheckGroupField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFCheckGroupProps = {
  defaultValue?: string;
  id?: `${string}:check-group:${string}`;
} & TRHFInputProps &
  Omit<TCommonCheckGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
export type { TCheckGroupOption } from '@/components/inputs/CommonCheckGroupField';
