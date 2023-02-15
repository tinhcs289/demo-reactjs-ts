import type { TCommonTimeFieldProps } from '@/components/inputs/CommonTimeField';
import type { TRHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';

export type TRHFTimeProps = {
  defaultValue?: Moment;
  id?: `${string}:time:${string}`;
} & TRHFInputProps &
  Omit<TCommonTimeFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;
