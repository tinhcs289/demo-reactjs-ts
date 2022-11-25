import type { StaticDatePickerProps } from '@mui/x-date-pickers/StaticDatePicker';
import type { Moment } from 'moment';
import type { ReactNode } from 'react';
export type ICommonDateMultiFieldProps = {
  value?: Moment[];
  onChange?: (value?: Moment[]) => void;
  error?: boolean;
  errorText?: ReactNode;
} & Omit<StaticDatePickerProps<any, Moment>, 'value' | 'onChange' | 'renderInput' | 'renderDay'>;
