import type { TRHFInputProps } from '@/components/rhfInputs';
import type { TCommonDateMultiFieldProps } from '@/components/inputs/CommonDateMultiField';
import type { Moment } from 'moment';
export type TRHFDateMultiProps = {
  defaultValue?: Moment;
  id?: `${string}:dates:${string}`;
} & TRHFInputProps &
  Omit<TCommonDateMultiFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
