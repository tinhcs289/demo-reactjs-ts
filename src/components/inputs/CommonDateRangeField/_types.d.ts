import type { GridProps } from '@mui/material/Grid';
import type { StaticDatePickerProps } from '@mui/x-date-pickers';
import type { Moment } from 'moment';
import type { RefAttributes } from 'react';
export type CommonDateRangeFieldValue = { from: Moment; to: Moment };
type PickerProps = StaticDatePickerProps<Moment> & RefAttributes<HTMLDivElement>;
export type CommonDateRangeFieldProps = GridProps & {
  value?: CommonDateRangeFieldValue;
  onChange?: (range?: CommonDateRangeFieldValue) => void;
  startDateLabel?: string;
  startDatePickerProps?: Partial<PickerProps>;
  startDatePickerGridProps?: Partial<GridProps>;
  endDateLabel?: string;
  endDatePickerProps?: Partial<PickerProps>;
  endDatePickerGridProps?: Partial<GridProps>;
};
export type CustomToolbarProps = DatePickerToolbarProps<Moment> & {
  label?: string;
  customDate?: Moment;
};
export type CustomPickerActionBarProps = PickersActionBarProps & {
  buttonOk?: string;
  buttonClear?: string;
  ButtonNegative?: string;
  closeOnSelect?: boolean;
};
