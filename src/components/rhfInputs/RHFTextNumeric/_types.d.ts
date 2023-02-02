import type { TCommonTextNumericFieldProps } from '@/components/inputs/CommonTextNumericField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';

export type RHFTextNumericProps = {
  defaultValue?: string;
  id?: `${string}:numeric:${string}`;
} & TRHFInputProps &
  Omit<TCommonTextNumericFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
