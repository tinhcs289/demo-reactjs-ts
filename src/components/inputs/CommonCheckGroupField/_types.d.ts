import type { TCommonCheckFieldProps } from '@/components/inputs/CommonCheckField';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { ReactNode } from 'react';

export type TCheckGroupOption = {
  label: ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: Omit<TCommonCheckFieldProps, 'name' | 'label' | 'value' | 'checked' | 'disabled'>;
  [x: string]: any;
};

export type TCommonCheckGroupFieldProps = {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: TCheckGroupOption[];
  value?: TCheckGroupOption[];
  onChange?: (options?: TCheckGroupOption[]) => void;
} & Omit<FormGroupProps, 'onChange'>;
