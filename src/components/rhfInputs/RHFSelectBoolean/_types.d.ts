import type { CommonSelectBooleanFieldProps } from '@/components/inputs/CommonSelectBooleanField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFSelectBooleanProps = {
  id?: `${string}:select-boolean:${string}`;
} & RHFInputProps &
  Omit<CommonSelectBooleanFieldProps, 'name'>;
