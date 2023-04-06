import type { CommonRadioFieldProps } from '@/components/inputs/CommonRadioField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFRadioProps = {
  defaultValue?: string;
  id?: `${string}:radio:${string}`;
} & RHFInputProps &
  Omit<CommonRadioFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
