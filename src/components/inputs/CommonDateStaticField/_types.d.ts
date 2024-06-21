import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { SxProps, Theme } from '@mui/material';
import type { StaticDatePickerProps } from '@mui/x-date-pickers/StaticDatePicker';
import type { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import type { DatePickerToolbarProps } from '@mui/x-date-pickers';
import type { Moment } from 'moment';
import type { ReactNode } from 'react';
export type CommonDateStaticFieldProps = StaticDatePickerProps<Moment> & {
  error?: boolean;
  errorText?: ReactNode;
  placeholder?: ReactNode;
  label?: ReactNode;
  sx?: SxProps<Theme>;
  TextFieldProps?: CommonTextFieldProps;
  buttonOk?: string;
  buttonClear?: string;
  ButtonNegative?: string;
  noActionsBar?: boolean;
  clearable?: boolean;
};
export type CustomPickerActionBarProps = PickersActionBarProps & {
  buttonOk?: string;
  buttonClear?: string;
  ButtonNegative?: string;
  closeOnSelect?: boolean;
  clearable?: boolean;
};
export type CustomToolbarProps = DatePickerToolbarProps<Moment> & {
  label?: string;
};
