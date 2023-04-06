import type { CommonKeyboardDateFieldProps } from '@/components/inputs/CommonKeyboardDateField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';

export type RHFKeyboardDateProps = {
  defaultValue?: Moment;
  id?: `${string}:date:${string}`;
} & RHFInputProps &
  Omit<CommonKeyboardDateFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
