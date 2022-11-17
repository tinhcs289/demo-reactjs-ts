import { FormControlLabelProps } from '@mui/material/FormControlLabelProps';
import { CheckboxProps } from '@mui/material/Checkbox';
import React from 'react';

export type TCommonCheckFieldProps = {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: React.ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: Omit<CheckboxProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
} & Omit<FormControlLabelProps, 'control'>;
