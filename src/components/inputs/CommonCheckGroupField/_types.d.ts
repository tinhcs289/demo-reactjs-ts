import type { CommonCheckFieldProps } from '@/components/inputs/CommonCheckField';
import type { AnyObject } from '@/types';
import type { BoxProps } from '@mui/material/Box';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { ReactNode } from 'react';
export type CheckGroupOption<OptionData extends AnyObject = AnyObject> = OptionData & {
  label: ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  InputProps?: Omit<CommonCheckFieldProps, 'name' | 'label' | 'value' | 'checked' | 'disabled'>;
};

export type CommonCheckGroupFieldProps = Omit<FormGroupProps, 'onChange'> & {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: CheckGroupOption[];
  value?: CheckGroupOption[];
  onChange?: (options?: CheckGroupOption[]) => void;
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
