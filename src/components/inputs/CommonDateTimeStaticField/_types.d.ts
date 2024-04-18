import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { SxProps, Theme } from '@mui/material';
import type { DateTimePickerToolbarProps } from '@mui/x-date-pickers';
import type { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import { StaticDateTimePickerProps } from '@mui/x-date-pickers/StaticDateTimePicker';
import type { Moment } from 'moment';
import type { ReactNode } from 'react';
import type { PickersLayoutRootProps } from '@mui/x-date-pickers';
export type CommonDateTimeStaticFieldProps = StaticDateTimePickerProps<Moment> & {
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
export type CustomToolbarProps = DateTimePickerToolbarProps<Moment> & {
  label?: string;
};
