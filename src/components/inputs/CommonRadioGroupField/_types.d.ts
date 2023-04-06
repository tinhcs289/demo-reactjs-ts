import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { ReactNode } from 'react';
export type RadioGroupOption = {
  label: ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: FormControlLabelProps;
  [x: string]: any;
};
export type CommonRadioGroupFieldProps = {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: RadioGroupOption[];
  value?: RadioGroupOption;
  groupProps?: Omit<RadioGroupProps, 'name' | 'value' | 'onChange'>;
  onChange?: (option?: RadioGroupOption) => void;
} & Omit<FormGroupProps, 'onChange'>;
