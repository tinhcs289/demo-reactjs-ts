import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { TextFieldProps } from '@mui/material/TextField';

export type TRHFTextProps = {
  defaultValue?: string;
} & TRHFInputProps &
  Omit<TextFieldProps, 'name' | 'defaultValue'>;
