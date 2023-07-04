import type { FormControlLabelProps } from '@mui/material/FormControlLabelProps';
import type { RadioProps } from '@mui/material/Radio';
import type { ChangeEvent, ReactNode } from 'react';
export type CommonRadioFieldProps = Omit<FormControlLabelProps, 'control'> & {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  checked?: boolean;
  value?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: Omit<RadioProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
  /**
   * @default true
   */
  eventStopPropagation?: boolean;
  /**
   * @default false
   */
  eventPreventDefault?: boolean;
};
