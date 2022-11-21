import React from 'react';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { TCommonCheckFieldProps } from '@/components/inputs/CommonCheckField/_types';

export type TCheckGroupOption = {
  label: React.ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: Omit<TCommonCheckFieldProps, 'name' | 'label' | 'value' | 'checked' | 'disabled'>;
  [x: string]: any;
};

export type TCommonCheckGroupFieldProps = {
  name?: string;
  label?: React.ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: React.ReactNode;
  options?: TCheckGroupOption[];
  value?: TCheckGroupOption[];
  onChange?: (options?: TCheckGroupOption[]) => void;
} & Omit<FormGroupProps, 'onChange'>;
