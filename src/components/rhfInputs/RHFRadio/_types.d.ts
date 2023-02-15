import type { TCommonRadioFieldProps } from '@/components/inputs/CommonRadioField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFRadioProps = {
  defaultValue?: string;
  id?: `${string}:radio:${string}`;
} & TRHFInputProps &
  Omit<TCommonRadioFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
