import type { TCommonTextNumericFieldProps } from '@/components/inputs/CommonTextNumericField';
import type { TRHFInputProps } from '@/components/rhfInputs';

export type TRHFTextNumericProps = {
  defaultValue?: string;
  id?: `${string}:numeric:${string}`;
} & TRHFInputProps &
  Omit<TCommonTextNumericFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
