import type { CommonDateTimeStaticFieldProps } from '@/components/inputs/CommonDateTimeStaticField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFDateTimeStaticProps = CommonDateTimeStaticFieldProps &
  RHFInputProps & {
    defaultValue?: Moment;
    id?: `${string}:date:${string}`;
  };
