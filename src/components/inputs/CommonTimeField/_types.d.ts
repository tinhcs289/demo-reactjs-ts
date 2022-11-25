import type { TimePickerProps } from '@mui/x-date-pickers';
import type { ReactNode } from 'react';
import type { Moment } from 'moment';
export type TCommonTimeFieldProps = {
  error?: boolean;
  errorText?: ReactNode;
} & TimePickerProps<any, Moment>;
