import type { TCommonSelectBooleanFieldProps } from '@/components/inputs/CommonSelectBooleanField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';

export type TRHFSelectBooleanProps = {
  id?: `${string}:select-boolean:${string}`;
} & TRHFInputProps &
  Omit<TCommonSelectBooleanFieldProps, 'name'>;
