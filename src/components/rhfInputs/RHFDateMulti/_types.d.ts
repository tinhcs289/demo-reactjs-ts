import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { ICommonDateMultiFieldProps } from '@/components/inputs/CommonDateMultiField/_types';
import type { Moment } from 'moment';

export type TRHFDateMultiProps = {
  defaultValue?: Moment;
  id?: `${string}:dates:${string}`;
} & TRHFInputProps &
  Omit<ICommonDateMultiFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
