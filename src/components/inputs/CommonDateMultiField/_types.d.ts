import type { ICommonDateMultiPickerFieldProps } from '@/components/inputs/CommonDateMultiPickerField/_types';
import type { TCommonTagInputFieldProps } from '@/components/inputs/CommonTagInputField/_types';
import type { PopoverProps } from '@mui/material/Popover';

export type TCommonDateMultiFieldProps = ICommonDateMultiPickerFieldProps & {
  placeholder?: string,
  tagFormat?: string,
  popoverProps?: Partial<PopoverProps>,
  inputProps?: Partial<Omit<TCommonTagInputFieldProps, 'value' | 'onChange'>>,
};