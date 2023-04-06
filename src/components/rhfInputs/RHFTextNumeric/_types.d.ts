import type { CommonTextNumericFieldProps } from '@/components/inputs/CommonTextNumericField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFTextNumericProps = {
  defaultValue?: string;
  id?: `${string}:numeric:${string}`;
} & RHFInputProps &
  Omit<CommonTextNumericFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
