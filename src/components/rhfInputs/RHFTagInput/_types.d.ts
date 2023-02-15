import type { TCommonTagInputFieldProps } from '@/components/inputs/CommonTagInputField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFTagInputProps = {
  id?: `${string}:tags-text:${string}`;
} & TRHFInputProps &
  Omit<TCommonTagInputFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
export type { TCommonTagInput } from '@/components/inputs/CommonTagInputField';
