import type { FormControlLabelProps } from '@mui/material/FormControlLabelProps';
import type { SwitchProps } from '@mui/material/Switch';
import type { ChangeEvent, ReactNode } from 'react';

export type TCommonSwitchFieldProps = {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: Omit<SwitchProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
} & Omit<FormControlLabelProps, 'control'>;
