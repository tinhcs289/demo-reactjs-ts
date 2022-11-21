import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { TCommonDateFieldProps } from '@/components/inputs/CommonDateField/_types';
import type { Moment } from 'moment';

export type TRHFDateTimeProps = {
  defaultValue?: Moment;
} & TRHFInputProps &
  Omit<TCommonDateFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
