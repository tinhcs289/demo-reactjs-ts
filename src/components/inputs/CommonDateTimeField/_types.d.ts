import type { MobileDateTimePickerProps, DateTimePickerToolbarProps } from '@mui/x-date-pickers';
import type { ReactNode } from 'react';
import type { Moment } from 'moment';
import type { SxProps, Theme } from '@mui/material';
import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
export type CommonDateTimeFieldProps = MobileDateTimePickerProps<Moment> & {
  error?: boolean;
  errorText?: ReactNode;
  sx?: SxProps<Theme>;
  placeholder?: ReactNode;
  TextFieldProps?: CommonTextFieldProps;
  buttonOk?: string;
  buttonClear?: string;
  ButtonNegative?: string;
};
export type CustomToolbarProps = DateTimePickerToolbarProps<Moment> & {
  label?: string;
};
