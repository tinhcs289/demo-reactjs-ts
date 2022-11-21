import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';

export type TCommonTextFieldProps = {
  errorText?: ReactNode;
} & TextFieldProps;
