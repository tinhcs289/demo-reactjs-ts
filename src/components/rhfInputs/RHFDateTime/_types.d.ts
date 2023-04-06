import type { CommonDateTimeFieldProps } from '@/components/inputs/CommonDateTimeField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFDateTimeProps = CommonDateTimeFieldProps & RHFInputProps & {
  defaultValue?: Moment;
  id?: `${string}:date-time:${string}`;
};
