import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { ICommonDateMultiPickerFieldProps } from '@/components/inputs/CommonDateMultiPickerField/_types';
import type { Moment } from 'moment';

export type TRHFDateMultiPickerProps = {
  defaultValue?: Moment;
  id?: `${string}:dates:${string}`;
} & TRHFInputProps &
  Omit<ICommonDateMultiPickerFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
