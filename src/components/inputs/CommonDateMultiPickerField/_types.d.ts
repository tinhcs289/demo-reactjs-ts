import type { TCommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { SxProps, Theme } from '@mui/material';
import type { StaticDatePickerProps } from '@mui/x-date-pickers/StaticDatePicker';
import type { Moment } from 'moment';
import type { ReactNode } from 'react';
export type ICommonDateMultiPickerFieldProps = {
  value?: Moment[];
  onChange?: (value?: Moment[]) => void;
  error?: boolean;
  errorText?: ReactNode;
  required?: boolean;
  sx?: SxProps<Theme>;
  TextFieldProps?: Partial<TCommonTextFieldProps>;
} & Omit<StaticDatePickerProps<any, Moment>, 'value' | 'onChange' | 'renderInput' | 'renderDay'>;
