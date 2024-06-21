import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { SxProps, Theme } from '@mui/material';
import type { MobileDatePickerProps } from '@mui/x-date-pickers/MobileDatePicker';
import type { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import type { DatePickerToolbarProps } from '@mui/x-date-pickers';
import type { Moment } from 'moment';
import type { ReactNode } from 'react';
export type CommonDateFieldProps = MobileDatePickerProps<Moment> & {
  error?: boolean;
  errorText?: ReactNode;
  placeholder?: ReactNode;
  sx?: SxProps<Theme>;
  TextFieldProps?: CommonTextFieldProps;
  buttonOk?: string;
  buttonClear?: string;
  ButtonNegative?: string;
  required?: boolean;
};
export type CustomPickerActionBarProps = PickersActionBarProps & {
  buttonOk?: string;
  buttonClear?: string;
  ButtonNegative?: string;
  closeOnSelect?: boolean;
};
export type CustomToolbarProps = DatePickerToolbarProps<Moment> & {
  label?: string;
};
