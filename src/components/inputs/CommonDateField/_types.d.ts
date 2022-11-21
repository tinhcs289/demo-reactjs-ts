import type { DatePickerProps } from '@mui/x-date-pickers';
import type { ReactNode } from 'react';
import type { Moment } from 'moment';
export type TCommonDateFieldProps = {
  error?: boolean;
  errorText?: ReactNode;
} & DatePickerProps<any, Moment>;
