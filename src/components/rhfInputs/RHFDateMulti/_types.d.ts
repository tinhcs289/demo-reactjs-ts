import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { TCommonDateMultiFieldProps } from '@/components/inputs/CommonDateMultiField/_types';
import type { Moment } from 'moment';

export type TRHFDateMultiProps = {
  defaultValue?: Moment;
  id?: `${string}:dates:${string}`;
} & TRHFInputProps &
  Omit<TCommonDateMultiFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
