import type { AnyObject, MuiIcon, MuiIconProps } from '@/types';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { ToggleButtonProps } from '@mui/material/ToggleButton';
import type { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import type { ReactNode, ComponentType } from 'react';
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
    // the same functions as `Button`
    startIcon?: MuiIcon;
    startIconProps?: MuiIconProps;
    endIcon?: MuiIcon;
    endIconProps?: MuiIconProps;
    [x: string]: any;
  };
export type ToggleVariant = 'button-group' | 'icon-button' | 'whatever';
export type CustomToggleButtonProps = Partial<ToggleButtonProps> & {
  index: number;
  option: ToggledOptionnumber;
  isChecked: booleannumber;
  isFirst?: booleannumber;
  isLast?: booleannumber;
};
export type CommonToggledFieldProps = Omit<ToggleButtonGroupProps, 'value' | 'onChange' | 'exclusive'> & {
  options?: ToggledOption[];
  value?: ToggledOptionValue | ToggledOptionValue[];
  /**
   * @default 'icon-button'
   */
  variant?: ToggleVariant;
  onChange?: (value: ToggledOptionValue | ToggledOptionValue[] | null | undefined) => void;
  multiple?: boolean;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  formGroupProps?: Partial<FormGroupProps>;
  buttonComponent?: ComponentType<CustomToggleButtonProps>;
};
