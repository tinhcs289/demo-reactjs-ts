import type { TRHFInputProps } from '@/components/rhfInputs';
import type { TCommonTextFieldProps } from '@/components/inputs/CommonTextField';
export type TRHFTextProps = {
  defaultValue?: string;
  id?: `${string}:text:${string}`;
} & TRHFInputProps &
  Omit<TCommonTextFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText'>;
