import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { FormGroupProps } from '@mui/material/FormGroup';
import React from 'react';

export type TRadioGroupOption = {
  label: React.ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: FormControlLabelProps;
  [x: string]: any;
};

export type TCommonRadioGroupFieldProps = {
  name?: string;
  label?: React.ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: React.ReactNode;
  options?: TRadioGroupOption[];
  value?: TRadioGroupOption;
  groupProps?: RadioGroupProps;
  onChange?: (option?: TRadioGroupOption) => void;
} & Omit<FormGroupProps, 'onChange'>;
