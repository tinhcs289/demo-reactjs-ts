import type { TCommonDateFieldProps } from '@/components/inputs/CommonDateField';
import type { TRHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';

export type TRHFDateProps = {
  defaultValue?: Moment;
  id?: `${string}:date:${string}`;
} & TRHFInputProps &
  Omit<TCommonDateFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
