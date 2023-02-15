import type { TRHFInputProps } from '@/components/rhfInputs';
import type { ICommonDateMultiPickerFieldProps } from '@/components/inputs/CommonDateMultiPickerField';
import type { Moment } from 'moment';

export type TRHFDateMultiPickerProps = {
  defaultValue?: Moment;
  id?: `${string}:dates:${string}`;
} & TRHFInputProps &
  Omit<
    ICommonDateMultiPickerFieldProps,
    'name' | 'defaultValue' | 'value' | 'error' | 'errorText',
    'onChange'
  >;
