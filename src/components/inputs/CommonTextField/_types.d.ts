import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';

export type MuiVariant = 'filled' | 'outlined' | 'standard';
export type TCommonTextFieldVariant = MuiVariant | `bootstrap:${MuiVariant}`;
export type TCommonTextFieldProps = {
  errorText?: ReactNode;
  variant?: TCommonTextFieldVariant;
} & Omit<TextFieldProps, 'variant'>;
