import { FormControlLabelProps } from '@mui/material/FormControlLabelProps';
import { Switch } from '@mui/material/Switch';
import React from 'react';

export type TCommonSwitchFieldProps = {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: React.ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: Omit<Switch, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
} & Omit<FormControlLabelProps, 'control'>;
