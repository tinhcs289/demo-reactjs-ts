import type { DateTimePickerProps } from '@mui/x-date-pickers';
import type { ReactNode } from 'react';
import type { Moment } from 'moment';
export type TCommonDateTimeFieldProps = {
  error?: boolean;
  errorText?: ReactNode;
} & DateTimePickerProps<any, Moment>;
