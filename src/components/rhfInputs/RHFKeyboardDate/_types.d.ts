import type { CommonKeyboardDateFieldProps } from '@/components/inputs/CommonKeyboardDateField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFKeyboardDateProps = CommonKeyboardDateFieldProps &
  RHFInputProps & {
    defaultValue?: Moment;
    id?: `${string}:date:${string}`;
  };
