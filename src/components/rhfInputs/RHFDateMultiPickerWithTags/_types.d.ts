import type { ICommonDateMultiPickerWithTagsFieldProps } from '@/components/inputs/CommonDateMultiPickerWithTagsField';
import type { TRHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type TRHFDateMultiPickerWithTagsProps = {
  defaultValue?: Moment;
  id?: `${string}:dates-tags:${string}`;
} & TRHFInputProps &
  Omit<
    ICommonDateMultiPickerWithTagsFieldProps,
    'name' | 'defaultValue' | 'value' | 'error' | 'errorText',
    'onChange'
  >;
