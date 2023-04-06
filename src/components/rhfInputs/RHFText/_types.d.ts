import type { RHFInputProps } from '@/components/rhfInputs';
import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
export type RHFTextProps = {
  defaultValue?: string;
  id?: `${string}:text:${string}`;
} & RHFInputProps &
  Omit<CommonTextFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText'>;
