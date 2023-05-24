import type { CommonCheckFieldProps } from '@/components/inputs/CommonCheckField';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { ReactNode } from 'react';
export type CheckGroupOption = {
  label: ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: Omit<CommonCheckFieldProps, 'name' | 'label' | 'value' | 'checked' | 'disabled'>;
  [x: string]: any;
};

export type CommonCheckGroupFieldProps = {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: CheckGroupOption[];
  value?: CheckGroupOption[];
  onChange?: (options?: CheckGroupOption[]) => void;
} & Omit<FormGroupProps, 'onChange'>;
