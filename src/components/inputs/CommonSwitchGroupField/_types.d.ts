import type { CommonSwitchFieldProps } from '@/components/inputs/CommonSwitchField';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { ReactNode } from 'react';

export type SwitchGroupOption = {
  label: ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: Omit<CommonSwitchFieldProps, 'name' | 'label' | 'value' | 'checked' | 'disabled'>;
  [x: string]: any;
};

export type CommonSwitchGroupFieldProps = {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: SwitchGroupOption[];
  value?: SwitchGroupOption[];
  onChange?: (options?: SwitchGroupOption[]) => void;
} & Omit<FormGroupProps, 'onChange'>;
