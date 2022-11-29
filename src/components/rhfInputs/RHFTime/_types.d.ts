import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { TCommonTimeFieldProps } from '@/components/inputs/CommonTimeField/_types';
import type { Moment } from 'moment';

export type TRHFTimeProps = {
  defaultValue?: Moment;
} & TRHFInputProps &
  Omit<TCommonTimeFieldProps, 'name' | 'defaultValue' | 'value' | 'error' | 'errorText', 'onChange'>;