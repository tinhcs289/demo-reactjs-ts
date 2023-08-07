import type { AnyObject } from '@/types';
import type { BoxProps } from '@mui/material/Box';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { ReactNode } from 'react';
export type RadioGroupOption<OptionData extends AnyObject = AnyObject> = OptionData & {
  label: ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: FormControlLabelProps;
  [x: string]: any;
};
export type CommonRadioGroupFieldProps = Omit<FormGroupProps, 'onChange'> & {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: RadioGroupOption[];
  value?: RadioGroupOption;
  groupProps?: Omit<RadioGroupProps, 'name' | 'value' | 'onChange'>;
  onChange?: (option?: RadioGroupOption) => void;
  /**
   * @default true
   */
  eventStopPropagation?: boolean;
  /**
   * @default false
   */
  eventPreventDefault?: boolean;
  optionsBoxProps?: Partial<BoxProps>;
};
