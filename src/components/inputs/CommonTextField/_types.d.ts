import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';

export type MuiVariant = 'filled' | 'outlined' | 'standard';
export type CommonTextFieldVariant = MuiVariant | `bootstrap`;
export type CommonTextFieldProps = {
  errorText?: ReactNode;
  variant?: CommonTextFieldVariant;
} & Omit<TextFieldProps, 'variant'>;
