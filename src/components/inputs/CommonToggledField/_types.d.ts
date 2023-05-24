import type { AnyObject, MuiIcon, MuiIconProps } from '@/types';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { ToggleButtonProps } from '@mui/material/ToggleButton';
import type { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import type { ReactNode } from 'react';
export type ToggledOptionValue = {
  value: string;
  label?: string;
  disabled?: boolean;
  data?: AnyObject;
};
export type ToggledOption = Partial<ToggleButtonProps> &
  ToggledOptionValue & {
    icon?: MuiIcon;
    iconProps?: MuiIconProps;
    [x: string]: any;
  };
export type CommonToggledFieldProps = Omit<ToggleButtonGroupProps, 'value' | 'onChange' | 'exclusive'> & {
  options?: ToggledOption[];
  value?: ToggledOptionValue | ToggledOptionValue[];
  onChange?: (value: ToggledOptionValue | ToggledOptionValue[] | null | undefined) => void;
  multiple?: boolean;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  formGroupProps?: Partial<FormGroupProps>;
};