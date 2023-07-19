import type { CommonTagInputFieldProps } from '@/components/inputs/CommonTagInputField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFTagInputProps = {
  id?: `${string}:tags-text:${string}`;
} & RHFInputProps &
  Omit<CommonTagInputFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
export type { CommonTagInputItem } from '@/components/inputs/CommonTagInputField';
