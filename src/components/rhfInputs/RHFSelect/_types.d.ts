import type { TCommonSelectFieldProps } from '@/components/inputs/CommonSelectField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';

export type TRHFSelectProps = {
  id?: `${string}:select:${string}`;
} & TRHFInputProps &
  Omit<TCommonSelectFieldProps, 'name'>;
