import type { CommonTimeFieldProps } from '@/components/inputs/CommonTimeField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFTimeProps = CommonTimeFieldProps &
  RHFInputProps & {
    defaultValue?: Moment;
    id?: `${string}:time:${string}`;
  };
