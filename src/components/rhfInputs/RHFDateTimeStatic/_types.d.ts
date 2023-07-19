import type { CommonDateStaticFieldProps } from '@/components/inputs/CommonDateTimeStaticField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFDateTimeStaticProps = CommonDateStaticFieldProps &
  RHFInputProps & {
    defaultValue?: Moment;
    id?: `${string}:date:${string}`;
  };
