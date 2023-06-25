import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type { SxProps, Theme } from '@mui/material';
import type { DatePickerToolbarProps, PickersDayProps } from '@mui/x-date-pickers';
import type { MobileDatePickerProps } from '@mui/x-date-pickers/MobileDatePicker';
import type { Moment } from 'moment';
import type { ReactNode } from 'react';
export type CommonDateMultiFieldProps = Omit<MobileDatePickerProps<Moment>, 'value' | 'onChange' | 'renderInput' | 'renderDay'> & {
  value?: Moment[];
  onChange?: (value?: Moment[]) => void;
  error?: boolean;
  errorText?: ReactNode;
  required?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
  TextFieldProps?: Partial<CommonTextFieldProps>;
  buttonOk?: string;
  buttonClear?: string;
  ButtonNegative?: string;
};
export type CustomToolbarProps = DatePickerToolbarProps<Moment> & {
  label?: string;
  dates?: Moment[];
  onDelete?: (date: Moment) => void;
};
export type CustomPickerDayProps = PickersDayProps<Moment> & {
  dates?: Moment[];
};
export type CustomPickerLayoutProps = PickersLayoutProps<Moment | null, Moment, DateView>;
export type DateTagInputItem = {
  id: string;
  label: string;
  date: Moment;
};
export type CustomInputProps = Omit<CommonTextFieldProps> & {
  dates?: DateTagInputItem[];
  onChangeTags?: (tags?: DateTagInputItem[]) => void;
  renderTag?: (tag: DateTagInputItem, index: number, deleteTag: (tag: DateTagInputItem) => void) => ReactNode;
};