import type { TCommonSelectBooleanFieldProps } from '@/components/inputs/CommonSelectBooleanField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFSelectBooleanProps = {
  id?: `${string}:select-boolean:${string}`;
} & TRHFInputProps &
  Omit<TCommonSelectBooleanFieldProps, 'name'>;
