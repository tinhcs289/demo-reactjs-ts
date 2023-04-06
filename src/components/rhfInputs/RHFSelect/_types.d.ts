import type { CommonSelectFieldProps } from '@/components/inputs/CommonSelectField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFSelectProps = {
  id?: `${string}:select:${string}`;
} & RHFInputProps &
  Omit<CommonSelectFieldProps, 'name'>;
export type { AutoCompleteOption } from '@/components/inputs/CommonSelectField';
