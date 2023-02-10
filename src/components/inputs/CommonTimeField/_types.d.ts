import type { TimePickerProps } from '@mui/x-date-pickers';
import type { ReactNode } from 'react';
import type { Moment } from 'moment';
import type { SxProps, Theme } from '@mui/material';
export type TCommonTimeFieldProps = {
  error?: boolean;
  errorText?: ReactNode;
  sx?: SxProps<Theme>;
  placeholder?: ReactNode;
} & TimePickerProps<any, Moment>;
