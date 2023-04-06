import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { SxProps, Theme } from '@mui/material';
import type { DateFieldProps } from '@mui/x-date-pickers';
import type { Moment } from 'moment';
import type { ReactNode } from 'react';
export type CommonKeyboardDateFieldProps = DateFieldProps<Moment> & {
  error?: boolean;
  errorText?: ReactNode;
  placeholder?: ReactNode;
  sx?: SxProps<Theme>;
  TextFieldProps?: CommonTextFieldProps;
};
