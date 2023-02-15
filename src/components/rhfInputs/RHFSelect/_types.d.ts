import type { TCommonSelectFieldProps } from '@/components/inputs/CommonSelectField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFSelectProps = {
  id?: `${string}:select:${string}`;
} & TRHFInputProps &
  Omit<TCommonSelectFieldProps, 'name'>;
export type { TAutoCompleteOption } from '@/components/inputs/CommonSelectField';
