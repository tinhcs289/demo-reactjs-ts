import type { DatePickerProps } from '@mui/x-date-pickers';
import type { ReactNode } from 'react';
import type { Moment } from 'moment';
import type { SxProps, Theme } from '@mui/material';
export type TCommonDateFieldProps = DatePickerProps<any, Moment> & {
  error?: boolean;
  errorText?: ReactNode;
  placeholder?: ReactNode;
  sx?: SxProps<Theme>;
};
