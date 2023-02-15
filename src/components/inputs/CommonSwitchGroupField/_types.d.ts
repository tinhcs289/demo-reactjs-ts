import type { TCommonSwitchFieldProps } from '@/components/inputs/CommonSwitchField';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { ReactNode } from 'react';

export type TSwitchGroupOption = {
  label: ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: Omit<TCommonSwitchFieldProps, 'name' | 'label' | 'value' | 'checked' | 'disabled'>;
  [x: string]: any;
};

export type TCommonSwitchGroupFieldProps = {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: TSwitchGroupOption[];
  value?: TSwitchGroupOption[];
  onChange?: (options?: TSwitchGroupOption[]) => void;
} & Omit<FormGroupProps, 'onChange'>;
