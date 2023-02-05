import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { TCommonDateFieldProps } from '@/components/inputs/CommonDateField/_types';
import type { Moment } from 'moment';

export type TRHFDateTimeProps = {
  defaultValue?: Moment;
  id?: `${string}:date-time:${string}`;
} & TRHFInputProps &
  Omit<TCommonDateFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
