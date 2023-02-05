import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { TCommonTextFieldProps } from '@/components/inputs/CommonTextField/_types';

export type TRHFTextProps = {
  defaultValue?: string;
  id?: `${string}:text:${string}`;
} & TRHFInputProps &
  Omit<TCommonTextFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText'>;
