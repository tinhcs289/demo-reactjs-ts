import type { TCommonSwitchFieldProps } from '@/components/inputs/CommonSwitchField/_types';
import type { FormGroupProps } from '@mui/material/FormGroup';
import React from 'react';

export type TSwitchGroupOption = {
  label: React.ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: Omit<TCommonSwitchFieldProps, 'name' | 'label' | 'value' | 'checked' | 'disabled'>;
  [x: string]: any;
};

export type TCommonSwitchGroupFieldProps = {
  name?: string;
  label?: React.ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: React.ReactNode;
  options?: TSwitchGroupOption[];
  value?: TSwitchGroupOption[];
  onChange?: (options?: TSwitchGroupOption[]) => void;
} & Omit<FormGroupProps, 'onChange'>;
