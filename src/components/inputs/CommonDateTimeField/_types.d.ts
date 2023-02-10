import type { DateTimePickerProps } from '@mui/x-date-pickers';
import type { ReactNode } from 'react';
import type { Moment } from 'moment';
import type { SxProps, Theme } from '@mui/material';
export type TCommonDateTimeFieldProps = {
  error?: boolean;
  errorText?: ReactNode;
  sx?: SxProps<Theme>;
  placeholder?: ReactNode;
} & DateTimePickerProps<any, Moment>;
