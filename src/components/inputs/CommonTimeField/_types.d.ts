import type { TimePickerProps } from '@mui/x-date-pickers';
import type { ReactNode } from 'react';
import type { Moment } from 'moment';
import type { SxProps, Theme } from '@mui/material';
import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { TimePickerToolbarProps } from '@mui/x-date-pickers';
export type CommonTimeFieldProps = {
  error?: boolean;
  errorText?: ReactNode;
  placeholder?: ReactNode;
  sx?: SxProps<Theme>;
  TextFieldProps?: CommonTextFieldProps;
  buttonOk?: string;
  buttonClear?: string;
  ButtonNegative?: string;
} & TimePickerProps<Moment>;
export type CustomToolbarProps = TimePickerToolbarProps<Moment> & {
  label?: string;
};