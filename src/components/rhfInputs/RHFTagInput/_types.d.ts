import type { TCommonTagInputFieldProps } from '@/components/inputs/CommonTagInputField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';
export type TRHFTagInputProps = {
  id?: `${string}:tags-text:${string}`;
} & TRHFInputProps &
  Omit<TCommonTagInputFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
