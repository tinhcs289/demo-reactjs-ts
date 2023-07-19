import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { SxProps, Theme } from '@mui/material';
import type { DatePickerToolbarProps } from '@mui/x-date-pickers';
import type { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import { StaticTimePickerProps } from '@mui/x-date-pickers/StaticTimePicker';
import type { Moment } from 'moment';
import type { ReactNode } from 'react';
export type CommonTimeStaticFieldProps = StaticTimePickerProps<Moment> & {
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
