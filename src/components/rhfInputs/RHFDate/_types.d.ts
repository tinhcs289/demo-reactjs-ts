import type { CommonDateFieldProps } from '@/components/inputs/CommonDateField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFDateProps = CommonDateFieldProps &
  RHFInputProps & {
    defaultValue?: Moment;
    id?: `${string}:date:${string}`;
  };
